const css = `
.xo-tbl-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th {
  font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--ink-30); padding: 9px 14px; text-align: left;
  border-bottom: 1px solid var(--ink-06); font-weight: 500;
}
td { padding: 10px 14px; border-bottom: 1px solid var(--ink-06); font-size: 12px; color: var(--ink); vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--ink-03); }
`;

export default function DataTable({ columns, rows }) {
  return (
    <>
      <style>{css}</style>
      <div className="xo-tbl-wrap">
        <table>
          <thead>
            <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} dangerouslySetInnerHTML={typeof cell === "string" ? { __html: cell } : undefined}>
                    {typeof cell !== "string" ? cell : undefined}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
