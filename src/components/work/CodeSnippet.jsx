// CodeSnippet: a short block of code inside a case study. Caption size and
// colours from the design system, one hairline frame, one 24px line per row.
export default function CodeSnippet({ code, caption, label }) {
  return (
    <figure className="code-snippet">
      <pre aria-label={label}><code>{code.trim()}</code></pre>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
