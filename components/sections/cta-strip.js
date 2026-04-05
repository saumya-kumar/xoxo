"use client";
import { useState } from "react";

const css = `
.xo-cta-strip {
  background: var(--ink); padding: 80px 48px; text-align: center;
}
.xo-cta-strip h2 {
  font-size: clamp(24px, 4vw, 44px); font-weight: 300;
  letter-spacing: -0.03em; color: #fff; margin-bottom: 16px;
}
.xo-cta-strip h2 strong { font-weight: 500; color: var(--green); }
.xo-cta-strip p { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
.xo-email-row {
  display: flex; max-width: 420px; margin: 0 auto;
}
.xo-email-input {
  flex: 1; font-family: var(--font-mono); font-size: 13px;
  padding: 13px 18px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-right: none; color: #fff; outline: none;
  border-radius: 3px 0 0 3px; transition: border-color 0.2s;
}
.xo-email-input::placeholder { color: rgba(255,255,255,0.25); }
.xo-email-input:focus { border-color: var(--green); }
.xo-email-btn {
  font-family: var(--font-mono); font-size: 12px;
  padding: 13px 24px; background: var(--green); color: var(--ink);
  border: none; border-radius: 0 3px 3px 0; cursor: pointer;
  font-weight: 500; white-space: nowrap; transition: background 0.2s;
  letter-spacing: 0.02em;
}
.xo-email-btn:hover { background: var(--green-hover); }
.xo-cta-success {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--green); margin-top: 0;
}
@media (max-width: 640px) {
  .xo-cta-strip { padding: 60px 20px; }
  .xo-email-row { max-width: 100%; }
}
`;

export default function CTAStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <style>{css}</style>
      <div className="xo-cta-strip reveal" id="cta">
        <h2>Bot traffic is<br /><strong>only going up.</strong></h2>
        <p>Get early access and start saving before your next AWS bill arrives.</p>
        {submitted ? (
          <div className="xo-cta-success">✓ &nbsp;You&apos;re on the list. We&apos;ll be in touch soon.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="xo-email-row">
              <input
                type="email"
                className="xo-email-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="xo-email-btn">Get access</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
