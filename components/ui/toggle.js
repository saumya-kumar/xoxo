"use client";
import { useState } from "react";

const styles = `
.xo-tog { position: relative; display: inline-block; width: 34px; height: 18px; flex-shrink: 0; }
.xo-tog input { opacity: 0; width: 0; height: 0; position: absolute; }
.xo-tog-track {
  position: absolute; inset: 0;
  background: var(--ink-12); border-radius: 100px;
  cursor: pointer; transition: background 0.2s;
}
.xo-tog-track::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; transition: transform 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
.xo-tog input:checked + .xo-tog-track { background: var(--green); }
.xo-tog input:checked + .xo-tog-track::after { transform: translateX(16px); }
.xo-tog input:focus-visible + .xo-tog-track { outline: 2px solid var(--green); outline-offset: 2px; }
`;

export default function Toggle({ defaultChecked = false, onChange, id }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <>
      <style>{styles}</style>
      <label className="xo-tog">
        <input type="checkbox" checked={checked} onChange={handleChange} id={id} />
        <span className="xo-tog-track" />
      </label>
    </>
  );
}
