const NOTE6_CONTENT = `
<h2>The short version</h2>
<p>This research proposes probabilistic safety mechanisms for Bitcoin fee estimation, addressing fundamental limitations in current mempool-based approaches. By combining empirical validation with statistical modeling, the goal is to create a framework that explicitly quantifies uncertainty and detects when estimation assumptions break down. The work is being conducted within Floresta, an open-source Bitcoin full node, with support from the Bitcoin Dev Launchpad program sponsored by Vinteum.</p>

<h2>Why this matters</h2>
<h3>The fee market problem</h3>
<p>Bitcoin's limited block space creates a competitive market where users attach transaction fees to compete for inclusion in blocks. Accurate fee estimation is critical: overestimation wastes money, while underestimation causes delays. Current approaches rely on analyzing a node's local mempool to predict miner behavior, but these methods fail silently when their underlying assumptions are violated.</p>

<h3>What's missing</h3>
<p>Existing fee estimation systems, including Bitcoin Core's, treat estimation as a deterministic calculation producing single-value recommendations. They lack mechanisms to detect divergence between a node's view and miners' views, quantify estimate reliability, provide actionable uncertainty metrics, or adapt to systematic failures.</p>
<p>Recent empirical work by Abubakar Sadiq Ismail has identified specific failure modes and proposed validation checks, but a comprehensive framework integrating these safety mechanisms with probabilistic reasoning remains unexplored.</p>

<h3>Goals</h3>
<ol>
<li>Develop a confidence layer implementing outcome-based validation of fee estimation assumptions</li>
<li>Design statistical methods for quantifying estimate reliability and expressing uncertainty</li>
<li>Create an integrated framework combining safety checks with probabilistic inference</li>
<li>Implement and validate the framework within Floresta, a production Bitcoin node</li>
<li>Empirically evaluate the system's accuracy, robustness and user experience benefits</li>
</ol>

<h2>How fees work today</h2>
<h3>Transaction fee mechanics</h3>
<p>Transaction fees represent the price of block space, expressed in satoshis per virtual byte (sat/vB). Miners construct blocks by selecting transactions that maximize fee revenue subject to a weight constraint of approximately 4 million weight units.</p>
<p>The fee market has several characteristics that make estimation hard:</p>
<ul>
<li><em>Non-stationarity</em> — fee rates fluctuate based on demand and network congestion</li>
<li><em>Strategic behavior</em> — users may wait for lower fees or employ fee bumping techniques</li>
<li><em>Asymmetric information</em> — miners may receive transactions through private channels</li>
<li><em>Dependency structures</em> — child transactions depend on unconfirmed parents</li>
</ul>

<h3>Current estimation approaches</h3>
<p>Bitcoin Core's estimator employs a historical bucket-based approach tracking confirmation times across fee rate ranges. It is stable across mempool fluctuations but reactive rather than predictive, requiring extended observation periods with no confidence metrics.</p>
<p>The mempool percentile method examines the current mempool state and constructs a hypothetical block template using a greedy algorithm. It is responsive to current conditions but assumes perfect mempool synchronization, provides only point estimates and has a single-block horizon.</p>

<h3>Mempool divergence</h3>
<p>Recent studies have documented systematic divergence between node mempools and miner behavior:</p>
<ul>
<li><em>Connectivity effects</em> — poorly connected nodes miss high-fee transactions propagating through well-connected miner nodes</li>
<li><em>Policy differences</em> — miners reject transactions based on proprietary scoring, script restrictions, or complexity limits</li>
<li><em>Private submission</em> — mining pools accept direct submissions bypassing P2P relay, filling an estimated 5–15% of block space</li>
</ul>

<h3>Ismail's empirical work</h3>
<p>Ismail's studies on Delving Bitcoin propose a confidence layer that validates fee estimation assumptions through outcome-based checks: mempool coverage analysis, high-priority transaction tracking, repeated failure detection through pattern analysis and historical alignment validation using past accuracy as evidence of current reliability.</p>

<h2>Key questions</h2>
<ul>
<li><em>Validation and detection:</em> How can we reliably detect when mempool-based fee estimation assumptions are violated? What observable metrics indicate divergence and how do we distinguish transient noise from systematic failures?</li>
<li><em>Uncertainty quantification:</em> How can we quantify and communicate estimate reliability? What probabilistic models capture fee market dynamics and how can confidence intervals be computed efficiently?</li>
<li><em>Integration:</em> How should confidence validation and statistical estimation be combined? Should checks gate all estimation or adjust outputs?</li>
<li><em>Real-world performance:</em> Does the probabilistic safety layer improve fee estimation in practice? How does accuracy compare to existing approaches?</li>
</ul>

<h2>The approach</h2>
<h3>System architecture</h3>
<p>The proposed system consists of three integrated layers:</p>
<p><em>Layer 1 — Confidence validation.</em> Implements Ismail's outcome-based checks: mempool coverage tracking, high-priority transaction confirmation monitoring, failure threshold detection with confidence decay, historical alignment scoring and a transaction pattern reputation system.</p>
<p><em>Layer 2 — Statistical estimation.</em> Provides probabilistic reasoning through fee rate distribution analysis, confirmation time modeling, mempool volatility detection, confidence interval computation and Bayesian belief updating.</p>
<p><em>Layer 3 — Integration API.</em> Exposes a unified interface delivering fee rate recommendations with confidence scores, probability distributions over confirmation times, warning signals for unreliable conditions and multi-target estimation.</p>

<h3>Why Floresta</h3>
<p>Floresta serves as the implementation platform due to its modern Rust codebase, active development community, Utreexo architecture providing unique research context and existing academic relationships. Prerequisites include implementing the <code>getblocktemplate</code> RPC method, enhancing the mempool with historical tracking and creating statistical analysis infrastructure.</p>

<h3>How we'll measure it</h3>
<p>Accuracy will be measured via MAPE, RMSE, confidence interval calibration and over/underpayment rates. Robustness metrics include true and false positive rates for identifying unreliable conditions, mean time to detection and recovery time. Baselines for comparison: Bitcoin Core <code>estimatesmartfee</code>, Mempool.space API, simple mempool percentile and an oracle estimator with perfect information.</p>

<h2>What this should produce</h2>
<h3>On the theory side</h3>
<p>Formalization of fee estimation as probabilistic inference with a mathematical framework for mempool-based prediction under uncertainty. General design principles for confidence layers validating distributed system assumptions. Statistical methods for uncertainty quantification adapted to cryptocurrency fee markets.</p>

<h3>On the practical side</h3>
<p>A production-ready open-source implementation in Floresta. Empirical analysis quantifying mempool divergence frequency and magnitude. Evidence for whether uncertainty information improves user decision-making.</p>

<h3>Broader impact</h3>
<p>For Bitcoin users: reduced overpayment and confirmation delays, better Lightning Network channel management tools and enhanced trust through transparent confidence metrics. For the broader ecosystem: techniques applicable to other blockchains and a framework for probabilistic prediction in decentralized networks.</p>

<h2>Timeline</h2>
<ol>
<li><em>Months 1–3: Foundation.</em> Literature review, analysis of existing implementations, theoretical framework, development environment setup.</li>
<li><em>Months 4–6: Confidence layer.</em> Implement <code>getblocktemplate</code> in Floresta, develop block template generation, implement sanity checks, create confidence scoring.</li>
<li><em>Months 7–9: Statistical components.</em> Fee rate distribution tracking, confirmation time models, volatility detection, Bayesian update framework.</li>
<li><em>Months 10–12: Integration.</em> Combine confidence layer with statistical estimator, design unified API, deploy test nodes on mainnet.</li>
<li><em>Months 13–15: Evaluation.</em> Comprehensive backtesting, comparative evaluation, result analysis, user study if applicable.</li>
<li><em>Months 16–18: Refinement.</em> Incorporate feedback, optimize implementation, complete writeup, prepare defense.</li>
</ol>

<h2>Risks and mitigations</h2>
<p><em>Technical risks.</em> Floresta's mempool implementation may be insufficient, mitigated by contributing upstream improvements. Historical data may be incomplete, mitigated by early data collection. Performance overhead may be unacceptable, mitigated by continuous profiling.</p>
<p><em>Research risks.</em> The confidence layer may not significantly improve accuracy, but characterizing failure modes remains valuable regardless. Comparisons may show no clear winner, but detailed contextual analysis is still a contribution.</p>

<h2>Wrapping up</h2>
<p>Bitcoin fee estimation sits at the intersection of distributed systems, applied statistics and economic mechanism design. Current approaches fail silently when assumptions are violated, leaving users without information about estimate reliability.</p>
<p>This research proposes a probabilistic safety layer that validates estimation assumptions and quantifies uncertainty. By combining Ismail's confidence checks with statistical modeling, the goal is to produce fee estimation that is more honest, more robust and more useful. Implementation within Floresta ensures real-world validation and broad dissemination.</p>
<h2>References</h2>
<ol>
<li>Ismail, Abubakar Sadiq. "Empirical Studies of Bitcoin Fee Markets." Delving Bitcoin, 2024.</li>
<li>Bitcoin Core. "Fee Estimation Algorithm Documentation." Bitcoin Core Project, 2024.</li>
<li>Antonopoulos, Andreas M., and David A. Harding. <em>Mastering Bitcoin</em>, 3rd ed. O'Reilly Media, 2023.</li>
<li>Easley, David, Maureen O'Hara, and Soumya Basu. "From Mining to Markets: The Evolution of Bitcoin Transaction Fees." <em>Journal of Financial Economics</em> 134, no. 1, 2019.</li>
<li>Floresta Project. "Floresta: A Utreexo-powered Bitcoin Full Node." GitHub, 2024.</li>
<li>Nakamoto, Satoshi. "Bitcoin: A Peer-to-Peer Electronic Cash System." 2008.</li>
</ol>
`;
