const styles = `
.xo-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 500; padding: 2px 8px;
  border-radius: 100px; white-space: nowrap; flex-shrink: 0;
  font-family: var(--font-mono);
}
.xo-badge-green  { background: var(--green-lt);  color: var(--green-dk); }
.xo-badge-red    { background: var(--red-lt);    color: #9b1212; }
.xo-badge-amber  { background: var(--amber-lt);  color: #92400e; }
.xo-badge-blue   { background: var(--blue-lt);   color: #1d4ed8; }
.xo-badge-neutral{ background: var(--ink-06);    color: var(--ink-60); }
.xo-badge-ink    { background: var(--ink);       color: var(--white); }
`;

const COLOR_MAP = {
  green: "xo-badge-green",
  red: "xo-badge-red",
  amber: "xo-badge-amber",
  blue: "xo-badge-blue",
  neutral: "xo-badge-neutral",
  ink: "xo-badge-ink",
};

export default function Badge({ children, color = "neutral", className = "" }) {
  return (
    <>
      <style>{styles}</style>
      <span className={["xo-badge", COLOR_MAP[color] || "xo-badge-neutral", className].filter(Boolean).join(" ")}>
        {children}
      </span>
    </>
  );
}
