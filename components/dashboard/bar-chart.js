const css = `
.xo-bars { display: flex; align-items: flex-end; gap: 3px; }
.xo-bar-w { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; height: 100%; justify-content: flex-end; }
.xo-bar { width: 100%; border-radius: 2px 2px 0 0; transition: opacity 0.2s; cursor: pointer; }
.xo-bar:hover { opacity: 0.7; }
.xo-bar-l { font-size: 9px; color: var(--ink-30); }
.xo-chart-note { font-size: 11px; color: var(--ink-30); margin-top: 8px; }
.xo-chart-legend { display: flex; gap: 16px; margin-top: 8px; }
.xo-chart-legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--ink-60); }
.xo-chart-legend-dot { width: 10px; height: 10px; border-radius: 2px; }
`;

export default function BarChart({ bars, height = 140, note, legend }) {
  return (
    <>
      <style>{css}</style>
      <div className="xo-bars" style={{ height }}>
        {bars.map((b, i) => (
          <div key={i} className="xo-bar-w">
            <div
              className="xo-bar"
              style={{ height: `${b.pct}%`, background: b.color || "var(--green)", opacity: b.opacity ?? 1 }}
            />
            {b.label && <div className="xo-bar-l">{b.label}</div>}
          </div>
        ))}
      </div>
      {note && <div className="xo-chart-note">{note}</div>}
      {legend && (
        <div className="xo-chart-legend">
          {legend.map(({ color, label }) => (
            <div key={label} className="xo-chart-legend-item">
              <div className="xo-chart-legend-dot" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
