"use client";

const styles = `
.xo-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-mono); font-weight: 500; letter-spacing: 0.02em;
  border: none; border-radius: 3px; cursor: pointer;
  transition: background 0.2s, transform 0.15s, border-color 0.2s, color 0.2s;
  text-decoration: none; white-space: nowrap; flex-shrink: 0;
}
.xo-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.xo-btn-sm  { font-size: 11px; padding: 6px 14px; }
.xo-btn-md  { font-size: 13px; padding: 11px 24px; }
.xo-btn-lg  { font-size: 13px; padding: 14px 32px; }
.xo-btn-full { width: 100%; }

.xo-btn-primary { background: var(--ink); color: var(--white); }
.xo-btn-primary:hover:not(:disabled) { background: var(--green); transform: translateY(-1px); }

.xo-btn-secondary {
  background: transparent; color: var(--ink-60);
  border: 1px solid var(--ink-12);
}
.xo-btn-secondary:hover:not(:disabled) { color: var(--ink); border-color: rgba(12,12,12,0.25); }

.xo-btn-ghost {
  background: transparent; color: var(--ink-60); border: 1px solid var(--ink-12);
}
.xo-btn-ghost:hover:not(:disabled) { border-color: var(--ink-30); color: var(--ink); background: var(--ink-03); }

.xo-btn-green { background: var(--green); color: var(--ink); font-weight: 600; }
.xo-btn-green:hover:not(:disabled) { background: var(--green-hover); }

.xo-btn-danger { background: var(--red-lt); color: #9b1212; border: 1px solid rgba(232,64,64,0.2); }
.xo-btn-danger:hover:not(:disabled) { background: var(--red); color: #fff; }

.xo-btn-dark { background: var(--ink); color: var(--white); border: none; }
.xo-btn-dark:hover:not(:disabled) { background: var(--green); border-color: var(--green); }
`;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  as: Tag = "button",
  ...props
}) {
  return (
    <>
      <style>{styles}</style>
      <Tag
        className={[
          "xo-btn",
          `xo-btn-${variant}`,
          `xo-btn-${size}`,
          full ? "xo-btn-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Tag>
    </>
  );
}
