"use client";
import { useState, useCallback } from "react";

const css = `
.xo-calc-section { max-width: 960px; margin: 0 auto; padding: 100px 48px; }
.xo-calc-wrap {
  margin-top: 56px; border: 1px solid var(--ink-06);
  border-radius: 4px; overflow: hidden;
}
.xo-calc-top {
  padding: 32px 36px; background: var(--white);
  border-bottom: 1px solid var(--ink-06);
}
.xo-calc-label {
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-40); margin-bottom: 20px;
}
.xo-slider-row {
  display: flex; align-items: center; gap: 20px; margin-bottom: 12px;
}
.xo-slider-row label { font-size: 12px; color: var(--ink-40); min-width: 180px; }
.xo-slider-row input[type=range] {
  flex: 1; accent-color: var(--green); height: 3px; cursor: pointer;
}
.xo-slider-val { font-size: 13px; font-weight: 500; color: var(--ink); min-width: 80px; text-align: right; }
.xo-calc-bottom {
  padding: 28px 36px; background: var(--ink);
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
.xo-calc-rl { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; margin-bottom: 8px; }
.xo-calc-rn { font-size: 24px; font-weight: 500; color: #fff; letter-spacing: -0.03em; }
.xo-calc-rn.g { color: var(--green); }
@media (max-width: 640px) {
  .xo-calc-section { padding: 60px 20px; }
  .xo-calc-top { padding: 24px 20px; }
  .xo-calc-bottom { grid-template-columns: 1fr; padding: 24px 20px; }
  .xo-slider-row { flex-wrap: wrap; }
  .xo-slider-row label { min-width: auto; }
}
`;

export default function SavingsCalculator() {
  const [visits, setVisits] = useState(10);
  const [spend, setSpend]   = useState(5000);
  const [bots, setBots]     = useState(40);

  const botShare = bots / 100;
  const waste    = Math.round(spend * botShare);
  const saving   = Math.round(waste * 0.85);
  const plan     = spend <= 2000 ? 99 : spend <= 10000 ? 499 : 2000;
  const roi      = (saving / plan).toFixed(1);

  const fmt = useCallback((n) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`, []);

  return (
    <>
      <style>{css}</style>
      <div className="xo-calc-section reveal">
        <div className="xo-eyebrow">Savings calculator</div>
        <h2 className="xo-section-title">See what<br /><strong>you&apos;d save.</strong></h2>
        <div className="xo-calc-wrap">
          <div className="xo-calc-top">
            <div className="xo-calc-label">Adjust to match your site</div>
            <div className="xo-slider-row">
              <label>Monthly visits</label>
              <input type="range" min="1" max="100" value={visits} step="1"
                onChange={(e) => setVisits(+e.target.value)} />
              <span className="xo-slider-val">{visits}M</span>
            </div>
            <div className="xo-slider-row">
              <label>Monthly infra spend</label>
              <input type="range" min="500" max="50000" value={spend} step="500"
                onChange={(e) => setSpend(+e.target.value)} />
              <span className="xo-slider-val">${spend.toLocaleString()}</span>
            </div>
            <div className="xo-slider-row">
              <label>Bot traffic share</label>
              <input type="range" min="20" max="70" value={bots} step="1"
                onChange={(e) => setBots(+e.target.value)} />
              <span className="xo-slider-val">{bots}%</span>
            </div>
          </div>
          <div className="xo-calc-bottom">
            <div>
              <div className="xo-calc-rl">MONTHLY WASTE TODAY</div>
              <div className="xo-calc-rn">{fmt(waste)}/mo</div>
            </div>
            <div>
              <div className="xo-calc-rl">XOXO SAVES YOU</div>
              <div className="xo-calc-rn g">{fmt(saving)}/mo</div>
            </div>
            <div>
              <div className="xo-calc-rl">YOUR ROI</div>
              <div className="xo-calc-rn g">{roi}×</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
