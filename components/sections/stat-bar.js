const css = `
.xo-stat-bar {
  border-top: 1px solid var(--ink-06); border-bottom: 1px solid var(--ink-06);
  background: var(--mid);
  display: grid; grid-template-columns: repeat(3, 1fr);
}
.xo-stat {
  padding: 36px 48px; border-right: 1px solid var(--ink-06); text-align: center;
}
.xo-stat:last-child { border-right: none; }
.xo-stat-num {
  font-size: 36px; font-weight: 500; letter-spacing: -0.04em;
  color: var(--ink); line-height: 1; margin-bottom: 8px;
}
.xo-stat-num .g { color: var(--green); }
.xo-stat-label { font-size: 12px; color: var(--ink-40); line-height: 1.5; }
@media (max-width: 640px) {
  .xo-stat-bar { grid-template-columns: 1fr; }
  .xo-stat { border-right: none; border-bottom: 1px solid var(--ink-06); padding: 24px 20px; }
  .xo-stat:last-child { border-bottom: none; }
}
`;

const STATS = [
  { num: "51", suffix: "%", label: "of web traffic is\nnow automated bots" },
  { num: "1000", suffix: "×", label: "more requests than\na single human visitor" },
  { num: "40",  suffix: "%", label: "of your bandwidth eaten\nby training crawlers" },
];

export default function StatBar() {
  return (
    <>
      <style>{css}</style>
      <div className="xo-stat-bar reveal">
        {STATS.map(({ num, suffix, label }) => (
          <div key={num} className="xo-stat">
            <div className="xo-stat-num"><span className="g">{num}</span>{suffix}</div>
            <div className="xo-stat-label">{label.split("\n").map((l, i) => (
              <span key={i}>{i > 0 && <br />}{l}</span>
            ))}</div>
          </div>
        ))}
      </div>
    </>
  );
}
