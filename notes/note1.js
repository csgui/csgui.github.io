const NOTE1_CONTENT = `
<p>Bitcoin transaction fees are more than a cost you attach to a transaction. They're a market signal. Miners prioritize transactions with the highest fees per byte and users are constantly balancing speed against cost.</p>

<h2>It's not deterministic</h2>
<p>Fee estimation looks simple on the surface. Your wallet asks a node for a suggested fee, you pay it and expect confirmation in the next block. But that's misleading. Fee estimation is fundamentally probabilistic. Every node has its own local view of the mempool and what it sees may not match what miners actually include.</p>

<h2>Where the uncertainty comes from</h2>
<p>The mempool is dynamic. Transactions arrive at unpredictable times with varying sizes and fee rates. A fee that would have worked a minute ago might not work now because higher-fee transactions just showed up.</p>
<p>Miner behavior makes it worse. Different miners follow different policies, see different transactions and may prioritize private submissions or package deals like Child Pays for Parent. Your node's mempool doesn't necessarily reflect what any given miner will do.</p>

<h2>Timing and dependencies</h2>
<p>Blocks arrive roughly every ten minutes, but it's a Poisson process, not a schedule. Even high-fee transactions aren't guaranteed in the next block. And when a transaction depends on an unconfirmed parent, miners evaluate the fee rate of the whole package, not just the individual transaction.</p>
<p>Network differences between nodes (relay rules, connection quality, capacity limits) add another layer of unpredictability.</p>

<h2>The problem with current tools</h2>
<p>Tools like Bitcoin Core's <code>estimatesmartfee</code> analyze historical data and mempool snapshots, but they present probabilistic outcomes as exact numbers. Users overpay or get stuck waiting, with no sense of the actual risk involved.</p>

<h2>A better approach: confidence alongside estimates</h2>
<p>Instead of replacing existing algorithms, you can add a probabilistic safety layer that provides a confidence measure with each estimate. For example: "40 sat/vB gives you roughly 60% chance of confirmation in the next block, given current mempool conditions."</p>
<p>This combines real-time mempool monitoring with historical analysis and statistical modeling. It quantifies uncertainty and flags situations where assumptions might be unreliable.</p>

<h2>Why it matters</h2>
<p>Moving from blind reliance on single numbers to informed predictions with confidence intervals is a meaningful shift. Wallets, exchanges and miners all benefit from understanding not just what fee to pay, but how reliable that recommendation actually is.</p>
`;
