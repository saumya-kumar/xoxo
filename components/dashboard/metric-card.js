const css = `
.xo-met {
  background: var(--white); border: 1px solid var(--ink-12);
  border-radius: 6px; padding: 16px 18px; position: relative; overflow: hidden;
}
.xo-met-acc { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; }
.xo-met-acc.g { background: var(--green); }
.xo-met-acc.b { background: var(--blue); }
.xo-met-acc.a { background: var(--amber); }
.xo-met-acc.r { background: var(--red); }
.xo-met-lbl { font-size: 10px; color: var(--ink-30); letter-spacing: 0.04em; margin-bottom: 8px; text-transform: uppercase; }
.xo-met-val { font-size: 26px; font-weight: 500; letter-spacing: -0.04em; color: var(--ink); line-height: 1; margin-bottom: 6px; }
.xo-met-val .u { font-size: 13px; font-weight: 400; color: var(--ink-30); }
.xo-met-ch { font-size: 11px; }
.xo-up-c { color: var(--green); }
.xo-dn-c { color: var(--red); }
.xo-nt-c { color: var(--ink-30); }
.xo-mets { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 16px; }
@media (max-width: 1024px) { .xo-mets { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 640px)  { .xo-mets { grid-template-columns: 1fr; } }
`;

export function MetricGrid({ children }) {
  return (
    <>
      <style>{css}</style>
      <div className="xo-mets">{children}</div>
    </>
  );
}

export default function MetricCard({ label, value, unit, change, changeType = "neutral", accent = "g" }) {
  const changeClass = changeType === "up" ? "xo-up-c" : changeType === "down" ? "xo-dn-c" : "xo-nt-c";
  return (
    <>
      <style>{css}</style>
      <div className="xo-met">
        <div className={`xo-met-acc ${accent}`} />
        <div className="xo-met-lbl">{label}</div>
        <div className="xo-met-val">
          {value}{unit && <span className="u">{unit}</span>}
        </div>
        {change && <div className={`xo-met-ch ${changeClass}`}>{change}</div>}
      </div>
    </>
  );
}
