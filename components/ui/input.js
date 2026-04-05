"use client";

const styles = `
.xo-field { margin-bottom: 16px; }
.xo-field-label {
  display: block; font-size: 11px; color: var(--ink-60);
  letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase;
}
.xo-input {
  width: 100%; font-family: var(--font-mono); font-size: 13px;
  padding: 11px 14px; border: 1px solid var(--ink-12); border-radius: 4px;
  background: var(--white); color: var(--ink); outline: none;
  transition: border-color 0.2s;
}
.xo-input:focus { border-color: var(--green); }
.xo-input::placeholder { color: var(--ink-30); }
.xo-input:read-only { background: var(--surface); cursor: default; }
.xo-input-sm { font-size: 12px; padding: 6px 12px; }
.xo-input-inline {
  font-family: var(--font-mono); font-size: 12px; padding: 6px 12px;
  border: 1px solid var(--ink-12); border-radius: 4px;
  background: var(--white); color: var(--ink); outline: none;
  transition: border-color 0.2s; min-width: 200px;
}
.xo-input-inline:focus { border-color: var(--green); }
.xo-input-inline:read-only { background: var(--surface); }
`;

export function Field({ label, children }) {
  return (
    <>
      <style>{styles}</style>
      <div className="xo-field">
        {label && <label className="xo-field-label">{label}</label>}
        {children}
      </div>
    </>
  );
}

export function Input({ size, className = "", ...props }) {
  return (
    <>
      <style>{styles}</style>
      <input
        className={["xo-input", size === "sm" ? "xo-input-sm" : "", className].filter(Boolean).join(" ")}
        {...props}
      />
    </>
  );
}

export function InlineInput({ className = "", ...props }) {
  return (
    <>
      <style>{styles}</style>
      <input
        className={["xo-input-inline", className].filter(Boolean).join(" ")}
        {...props}
      />
    </>
  );
}
