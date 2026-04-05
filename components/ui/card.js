const styles = `
.xo-card {
  background: var(--white);
  border: 1px solid var(--ink-12);
  border-radius: 6px;
  overflow: hidden;
}
.xo-card-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--ink-06);
  display: flex; align-items: center; justify-content: space-between;
}
.xo-card-title { font-size: 12px; font-weight: 500; color: var(--ink); }
.xo-card-action { font-size: 11px; color: var(--ink-30); cursor: pointer; transition: color 0.2s; }
.xo-card-action:hover { color: var(--green); }
.xo-card-body { padding: 18px; }
`;

export function Card({ children, className = "" }) {
  return (
    <>
      <style>{styles}</style>
      <div className={["xo-card", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </>
  );
}

export function CardHeader({ title, action, onAction }) {
  return (
    <div className="xo-card-header">
      <span className="xo-card-title">{title}</span>
      {action && (
        <span className="xo-card-action" onClick={onAction}>
          {action}
        </span>
      )}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return (
    <div className={["xo-card-body", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
