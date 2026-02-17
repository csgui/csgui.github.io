const NOTE9_CONTENT = `
<p>Bitcoin light clients currently rely on Compact Block Filters (BIP-158) to figure out which blocks contain their transactions. BIP-158 works well for privacy (each filter uses a unique cryptographic key) but that design creates a real CPU bottleneck. The per-filter hashing is expensive and it hits hardest on mobile and resource-constrained devices where light clients are supposed to shine.</p>

<p>This research explores whether alternative sketch data structures, deterministic lookup mechanisms, or range-based query approaches can maintain privacy guarantees while cutting computational overhead. The goal is better tradeoffs between CPU cost, bandwidth and storage.</p>

<h2>The problem with BIP-158</h2>

<p>BIP-158 Golomb-coded set filters have become the de facto standard for Bitcoin light clients, but they come with clear tradeoffs:</p>

<ul>
<li><em>Index disk space (~12 GB)</em> — reasonable for desktop clients, prohibitive on mobile</li>
<li><em>Per-filter unique SipHash keys</em> — strong privacy, but a CPU bottleneck during scanning</li>
<li><em>Cryptographic strength requirement</em> — protection against malicious script construction leaves no room for optimization</li>
<li><em>Mobile effectiveness</em> — limited by CPU overhead during filter generation and scanning</li>
</ul>

<h3>Core research questions</h3>

<ol>
<li>Does a sketch exist that provides comparable compactness to BIP-158 while reducing per-filter hashing overhead? How does eliminating unique keys affect security against malicious script construction?</li>
<li>Can a deterministic data structure replace hash-based approaches entirely, trading CPU for storage/memory? What are the actual compactness/speed tradeoffs?</li>
<li>Can aggregating block filters into range-based structures improve query latency and reduce redundant computation?</li>
</ol>

<p>These questions are intentionally open-ended, requiring empirical evaluation across multiple candidate approaches.</p>

<h2>Why Floresta?</h2>

<p>Floresta is a Bitcoin full node implementation using Utreexo technology, written in Rust. It already implements BIP-158 filter generation and distribution, making it an ideal experimental platform:</p>

<ul>
<li><em>Reference implementation</em> — Floresta's BIP-158 implementation provides ground truth for validating alternative sketch correctness</li>
<li><em>Modular architecture</em> — the filter generation code is exposed and extensible, enabling direct swapping of sketch implementations</li>
<li><em>Real-world validation</em> — can benchmark against actual blockchain data at scale</li>
<li><em>Instrumentation</em> — full node context allows detailed profiling of CPU/memory/bandwidth tradeoffs</li>
</ul>

<p>The current implementation uses Golomb-coded sets with SipHash and per-filter unique keys. The CPU bottleneck occurs in two phases: filter generation (computing SipHash for every script element in a block) and filter scanning (recomputing SipHash with client-provided data to check for matches).</p>

<h2>Research methodology</h2>

<h3>Phase 1: baseline profiling</h3>

<p>Establish quantitative metrics for BIP-158 by generating filters for recent blockchain segments (10,000–100,000 blocks). Instrument Floresta's filter generation code to measure total CPU cycles, hashing overhead specifically, filter serialization size per block and memory overhead. Profile scanning with realistic query sets (100–10,000 scripts), measuring CPU cache efficiency and false positive rates.</p>

<h3>Phase 2: alternative sketch implementation</h3>

<p>Implement candidate alternative sketches within Floresta's modular framework:</p>

<ul>
<li><em>Bloom Filters</em> — simpler hash function requirements, established tradeoffs. Weaker hashing may reduce CPU without compromising usability since false positives add minimal cost downstream</li>
<li><em>Cuckoo Filters</em> — better space efficiency than Bloom, faster queries. More complex insertion logic, but lookup properties may reduce scanning time</li>
<li><em>XOR Filters</em> — extremely compact, deterministic structure, zero hashing during queries. Large construction overhead, but eliminates scanning-time hashing entirely</li>
<li><em>Learned Index Structures</em> — emerging research direction for data-dependent optimization. Script distribution within blocks may admit compression via learned patterns</li>
</ul>

<h3>Phase 3: security analysis</h3>

<p>For each candidate, rigorously evaluate the threat model. The original threat is attackers constructing scripts specifically designed to hash into filters, triggering false positives. For each sketch: does it require per-block unique keys? If not, why can't attackers construct matching scripts? What is the actual attack cost vs. defense benefit? Are there alternative privacy-related threat models the sketch admits?</p>

<h3>Phase 4: comprehensive benchmarking</h3>

<p>For each sketch, measure across the entire tradeoff space: CPU overhead (cycles for generation and scanning), space efficiency (filter size, index disk size for full chain), query latency (end-to-end time for typical patterns), false positive rate, memory footprint and mobile feasibility via ARM cross-compilation and constrained hardware simulation.</p>

<h3>Phase 5: range-based query exploration</h3>

<p>Once single-block filters are optimized, explore aggregation. Batching blocks into ranges allows amortized hashing cost across multiple blocks, reduced redundancy in cumulative script sets and better cache locality during scanning. Generate range filters for blocks <code>[i, i+k)</code> for various <code>k</code> (100, 1,000, 10,000) and measure space overhead vs. scanning speedup.</p>

<h2>Expected outcomes</h2>

<ul>
<li><em>Empirical comparison framework</em> — first systematic benchmark comparing sketch families (Bloom, Cuckoo, XOR, learned) for Bitcoin filter design, with quantified tradeoffs</li>
<li><em>CPU bottleneck characterization</em> — detailed breakdown of where hashing overhead occurs and how different sketches ameliorate it; actionable guidance for light client developers</li>
<li><em>Security analysis</em> — formal threat model refinement clarifying whether privacy guarantees are relaxed by alternative sketches or merely accelerated via cheaper operations</li>
<li><em>Novel findings</em> — specific sketches achieving measurable CPU reduction with quantified filter size tradeoffs; range-based aggregation results; compression via learned structures for real-world script distributions</li>
</ul>

<h2>Implementation plan</h2>

<ol>
<li>Verify Floresta's BIP-158 implementation correctness against test vectors and create an instrumented version logging hash call counts, filter sizes and timings</li>
<li>Refactor Floresta's filter code to expose a trait-based interface (<code>BlockFilter</code> trait with <code>new</code>, <code>contains</code> and <code>serialize</code> methods)</li>
<li>Implement Bloom, Cuckoo and XOR filter alternatives, each passing correctness tests against the BIP-158 baseline and generating real filters for recent blocks</li>
<li>Run comprehensive benchmarks across all sketches, aggregate metrics and profile mobile constraints via ARM simulation</li>
<li>Formal security and threat model analysis for each sketch vs. malicious script construction</li>
<li>Implement range filter aggregation for top-performing sketch and benchmark range queries against single-block baseline</li>
<li>Write technical report with benchmarks, graphs and threat model analysis targeting Financial Cryptography (FC), ACM CCS, or IEEE TDSC</li>
</ol>

<h2>Success criteria</h2>

<ul>
<li><em>Quantitative</em> — identify at least one sketch achieving >20% CPU reduction in scanning vs. BIP-158, while maintaining false positive rates below 2%</li>
<li><em>Qualitative</em> — clear security analysis showing why alternative sketches do or don't compromise privacy guarantees</li>
<li><em>Practical</em> — actionable guidance for light client developers (e.g., "use XOR filters for mobile devices; trade X% larger index for Y% CPU savings")</li>
<li><em>Reproducible</em> — all code integrated into Floresta; benchmarks runnable on standard hardware</li>
</ul>

<h2>Open questions</h2>

<p>Are there sketch families beyond Bloom/Cuckoo/XOR worth exploring (quotient filters, succinct sketches)? How much of the CPU overhead is actually hashing vs. other operations? What is the realistic false positive cost in practice, given that it depends on downstream validation overhead? Can machine learning improve compression for real script distributions? And do range-based queries enable new privacy attacks?</p>

<p>This research provides the empirical foundation for answering these questions, with potential to influence future BIP standardization if results demonstrate clear superiority over the current approach.</p>
`;
