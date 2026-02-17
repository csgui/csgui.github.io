const NOTE7_CONTENT = `
<p>Mempools can get messy fast when you start layering covenants on top of Bitcoin transactions. Transactions stop being independent. They form these mini dependency trees that push the limits of fee bumping, eviction rules and ancestor limits. Watching how they behave in practice is surprisingly revealing.</p>

<h2>how it works</h2>
<p>Covenants let you lock outputs in ways that enforce future spending patterns. That means a single transaction can have a chain of dependent children that are constrained by the covenant. The mempool has rules to limit these chains, like ancestor and descendant limits, but no one has measured what happens when you push covenants hard.</p>

<h3>dependency chains</h3>
<p>When transactions form long chains because of covenants, you can run into problems:</p>

<ul>
<li><em>Ancestor limits</em> — the maximum number of parent transactions a tx can have in the mempool</li>
<li><em>Descendant limits</em> — the maximum number of children a tx can spawn before hitting mempool rules</li>
<li><em>Fee bumping</em> — strategies like CPFP can fail if a covenant locks the structure</li>
</ul>

<h2>why this matters</h2>
<p>Wallets and nodes assume transactions can propagate and bump fees. If a covenant creates a chain that violates limits or can't be fee-bumped, it can stall the mempool. That's not just theoretical. Users might see stuck funds and miners could get unexpected transaction patterns.</p>

<h2>the approach</h2>
<p>To study this, you can simulate a mempool that understands both Bitcoin policy and covenants:</p>

<ol>
<li>Implement ancestor/descendant tracking in the simulator.</li>
<li>Generate synthetic covenant graphs with branching, time locks and recursive patterns.</li>
<li>Feed them into the mempool model and record admission, eviction and fee-bumping success rates.</li>
<li>Analyze how covenants stress the system compared to standard transactions.</li>
</ol>

<h2>key takeaways</h2>
<p>Even simple covenant structures can change mempool dynamics dramatically. Transactions that would normally be accepted or easily bumped can get stuck. Understanding this interaction is essential for building wallets that actually work with covenants and for Core devs considering policy adjustments.</p>

<p>This kind of simulation doesn't just prove a point; it provides actionable insight for designing safe, predictable transaction policies and wallet strategies. It also sets the stage for studying more complex interactions with stateless validation and Utreexo proofs.</p>
`;
