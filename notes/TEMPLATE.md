# Note Template for imchris.me

Use this template when adding a new note to the site. Follow all steps exactly.

## Step 1: Create the content file

Create `notes/noteN.js` (replace N with the next number in sequence):

```javascript
const NOTEN_CONTENT = `
<p>Opening paragraph — a direct, conversational introduction to the topic. No "this post explores" or academic phrasing. Just get into it.</p>

<h2>Section heading</h2>
<p>Body text. Keep paragraphs short and direct. Avoid excessive bold. Use plain language.</p>

<h3>Subsection heading (optional)</h3>
<p>More detail on a subtopic.</p>

<ul>
<li><em>Term</em> — explanation using em for the term and a dash before the description</li>
<li><em>Another term</em> — keep list items concise</li>
</ul>

<ol>
<li>Numbered items for sequential steps or ranked lists</li>
<li>Each item should be a full sentence or clear phrase</li>
</ol>

<blockquote>"Quoted text goes here — use sparingly."</blockquote>

<p>Inline code: use <code>code tags</code> for technical terms, function names, CLI commands.</p>

<h2>Another section</h2>
<p>Continue with more sections as needed. Aim for 3-6 h2 sections per note.</p>
`;
```

## Step 2: Add script tag to index.html

Add before the `<script type="text/babel">` block, alongside the other note scripts:

```html
<script src="notes/noteN.js"></script>
```

## Step 3: Add entry to BLOG_POSTS array

Add at the TOP of the `BLOG_POSTS` array in `index.html` (newest first):

```javascript
{
    id: "noteN",
    title: "Note Title Here",
    date: "Month Year",           // e.g. "February 2026"
    category: "Category",         // e.g. "Bitcoin", "Compilers", "Distributed Systems", "Data Structures", "L2 Scaling", "Research Proposal"
    summary: "One or two sentences summarizing the note. Keep it under 200 characters.",
    content: NOTEN_CONTENT,
    tags: ["Tag1", "Tag2"],       // From: Bitcoin, Research Proposal, Compilers, Programming Languages, Cryptography
    // draft: true,               // Uncomment to mark as Work in Progress (hidden by default, visible under WIP filter)
},
```

## Content guidelines

- **Tone**: Conversational, direct. Not academic or formal. Write like you're explaining to a peer.
- **Headings (h2)**: Short, lowercase-feeling. e.g. "How it works", "Why this matters", "The approach". Avoid thesis language like "Executive Summary", "Methodology", "Literature Review".
- **Headings (h3)**: Used for subsections under an h2. Same tone.
- **Paragraphs**: Short — 2-4 sentences. Break up walls of text.
- **Bold**: Use sparingly. Don't bold entire sentences.
- **Lists**: Use `<ul>` with `<em>` for term definitions. Use `<ol>` for sequential/numbered items.
- **Blockquotes**: One per note maximum. Use for a key insight or quote.
- **Code**: Use `<code>` for inline technical terms.
- **No emojis.**

## Available tags

These must match entries in `FILTER_TAGS` in index.html:
- Bitcoin
- Research Proposal
- Compilers
- Programming Languages
- Cryptography

## Rendering info

- h2 renders as: monospace, uppercase, small, with a bottom border
- h3 renders as: monospace, uppercase, smaller, no border
- p renders as: justified text, 1.25rem, Source Serif 4 font
- First p in content: same style as all other paragraphs
- Blockquotes: left orange border, italic, muted color
- The note ID is used in the URL hash (e.g. `imchris.me/#noteN`)
