"use client";
import { useState } from "react";
import Link from "next/link";

const css = `
/* ── Wizard shell ── */
.xo-wiz-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: var(--ink); height: 42px;
  display: flex; align-items: center; padding: 0 24px; gap: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  overflow-x: auto; scrollbar-width: none;
}
.xo-wiz-bar::-webkit-scrollbar { display: none; }
.xo-wiz-logo { font-size: 13px; font-weight: 600; color: #fff; margin-right: 24px; flex-shrink: 0; letter-spacing: -0.02em; }
.xo-wiz-logo em { color: var(--green); font-style: normal; }
.xo-wiz-steps { display: flex; align-items: center; flex: 1; }
.xo-wiz-step {
  display: flex; align-items: center; gap: 8px;
  padding: 0 16px; height: 42px; cursor: pointer;
  font-size: 11px; color: rgba(255,255,255,0.3);
  letter-spacing: 0.02em; transition: color 0.2s; white-space: nowrap;
  border-right: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
}
.xo-wiz-step:hover { color: rgba(255,255,255,0.6); }
.xo-wiz-step.active { color: #fff; background: rgba(255,255,255,0.07); }
.xo-wiz-step.done { color: var(--green); }
.xo-wiz-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.xo-wiz-next { margin-left: auto; font-size: 11px; color: rgba(255,255,255,0.25); padding-left: 20px; flex-shrink: 0; cursor: pointer; transition: color 0.2s; }
.xo-wiz-next:hover { color: var(--green); }

/* ── Screen wrapper ── */
.xo-wiz-screen { min-height: 100vh; padding-top: 42px; }

/* ── Auth screen ── */
.xo-auth-wrap {
  min-height: calc(100vh - 42px); display: flex; align-items: center; justify-content: center;
  background: var(--white); padding: 40px 20px;
}
.xo-auth-card { width: 100%; max-width: 400px; }
.xo-auth-logo { font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 32px; letter-spacing: -0.02em; }
.xo-auth-logo em { color: var(--green); font-style: normal; }
.xo-auth-title { font-size: 22px; font-weight: 500; color: var(--ink); margin-bottom: 6px; letter-spacing: -0.02em; }
.xo-auth-sub { font-size: 13px; color: var(--ink-60); margin-bottom: 32px; line-height: 1.6; }
.xo-field { margin-bottom: 16px; }
.xo-field label { display: block; font-size: 11px; color: var(--ink-60); letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase; }
.xo-field input {
  width: 100%; font-family: var(--font-mono); font-size: 13px;
  padding: 11px 14px; border: 1px solid var(--ink-12); border-radius: 4px;
  background: var(--white); color: var(--ink); outline: none; transition: border-color 0.2s;
}
.xo-field input:focus { border-color: var(--green); }
.xo-field input::placeholder { color: var(--ink-30); }
.xo-btn-auth {
  width: 100%; font-family: var(--font-mono); font-size: 13px; font-weight: 500;
  padding: 12px; border: none; border-radius: 4px; cursor: pointer;
  background: var(--ink); color: var(--white); letter-spacing: 0.02em;
  transition: background 0.2s; margin-top: 8px;
}
.xo-btn-auth:hover { background: var(--green); }
.xo-social {
  width: 100%; font-family: var(--font-mono); font-size: 12px;
  padding: 11px; border: 1px solid var(--ink-12); border-radius: 4px;
  background: var(--white); color: var(--ink-60); cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: border-color 0.2s; margin-bottom: 8px;
}
.xo-social:hover { border-color: var(--ink-30); }
.xo-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
.xo-divider::before, .xo-divider::after { content: ''; flex: 1; height: 1px; background: var(--ink-12); }
.xo-divider span { font-size: 11px; color: var(--ink-30); }
.xo-auth-footer { margin-top: 24px; font-size: 12px; color: var(--ink-30); text-align: center; }
.xo-auth-footer a { color: var(--green); }

/* ── Plan picker ── */
.xo-plan-wrap {
  min-height: calc(100vh - 42px); background: var(--white); padding: 60px 40px;
  display: flex; flex-direction: column; align-items: center;
}
.xo-plan-title { font-size: 26px; font-weight: 500; color: var(--ink); margin-bottom: 6px; text-align: center; letter-spacing: -0.02em; }
.xo-plan-sub { font-size: 13px; color: var(--ink-60); margin-bottom: 48px; text-align: center; }
.xo-plan-grid { display: grid; grid-template-columns: repeat(3, 300px); gap: 2px; background: var(--ink-06); border: 1px solid var(--ink-06); }
.xo-plan-opt {
  background: var(--white); padding: 32px; cursor: pointer;
  transition: background 0.15s; border: 2px solid transparent; position: relative;
}
.xo-plan-opt:hover { background: var(--surface); }
.xo-plan-opt.sel { border-color: var(--green); background: var(--green-lt); }
.xo-plan-tag { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 16px; }
.xo-plan-opt.sel .xo-plan-tag { color: var(--green-dk); }
.xo-plan-name { font-size: 18px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
.xo-plan-price { font-size: 36px; font-weight: 500; color: var(--ink); letter-spacing: -0.04em; line-height: 1; margin: 12px 0 4px; }
.xo-plan-opt.sel .xo-plan-price { color: var(--green); }
.xo-plan-period { font-size: 11px; color: var(--ink-30); margin-bottom: 20px; }
.xo-plan-feats { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.xo-plan-feats li { font-size: 12px; color: var(--ink-60); display: flex; gap: 8px; }
.xo-plan-feats li::before { content: '—'; color: var(--green); }
.xo-plan-actions { margin-top: 36px; display: flex; gap: 12px; }
.xo-plan-hint { margin-top: 16px; font-size: 12px; color: var(--ink-30); }

/* ── Onboarding sidebar layout ── */
.xo-ob-wrap { min-height: calc(100vh - 42px); display: flex; background: var(--white); }
.xo-ob-sidebar {
  width: 300px; background: var(--ink); padding: 40px 32px;
  display: flex; flex-direction: column; flex-shrink: 0;
}
.xo-ob-logo { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 40px; }
.xo-ob-logo em { color: var(--green); font-style: normal; }
.xo-ob-steps { display: flex; flex-direction: column; gap: 0; }
.xo-ob-step { display: flex; align-items: flex-start; gap: 14px; padding: 16px 0; position: relative; }
.xo-ob-step:not(:last-child)::after { content: ''; position: absolute; left: 11px; top: 40px; bottom: -8px; width: 1px; background: rgba(255,255,255,0.08); }
.xo-ob-circle { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; margin-top: 2px; }
.xo-ob-circle.done { background: var(--green); color: var(--ink); }
.xo-ob-circle.active { background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); }
.xo-ob-circle.todo { background: transparent; color: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.1); }
.xo-ob-step-title { font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 2px; }
.xo-ob-step.todo .xo-ob-step-title { color: rgba(255,255,255,0.3); }
.xo-ob-step-sub { font-size: 11px; color: rgba(255,255,255,0.3); }
.xo-ob-step.active .xo-ob-step-sub { color: rgba(255,255,255,0.5); }
.xo-ob-main { flex: 1; padding: 40px 48px; overflow-y: auto; }
.xo-ob-step-num { font-size: 11px; letter-spacing: 0.08em; color: var(--green); text-transform: uppercase; margin-bottom: 8px; }
.xo-ob-title { font-size: 24px; font-weight: 500; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.02em; }
.xo-ob-desc { font-size: 13px; color: var(--ink-60); line-height: 1.7; margin-bottom: 32px; max-width: 480px; }
.xo-domain-row { display: flex; gap: 10px; margin-bottom: 20px; max-width: 440px; }
.xo-domain-row input {
  flex: 1; font-family: var(--font-mono); font-size: 13px;
  padding: 11px 14px; border: 1px solid var(--ink-12); border-radius: 4px;
  background: var(--white); color: var(--ink); outline: none;
}
.xo-domain-row input:focus { border-color: var(--green); }
.xo-domain-row button {
  font-family: var(--font-mono); font-size: 12px; padding: 11px 20px;
  background: var(--ink); color: var(--white); border: none; border-radius: 4px;
  cursor: pointer; white-space: nowrap; transition: background 0.15s;
}
.xo-domain-row button:hover { background: var(--green); }
.xo-alert { display: flex; gap: 10px; padding: 12px 16px; border-radius: 4px; font-size: 12px; margin-bottom: 20px; }
.xo-alert.green { background: var(--green-lt); color: var(--green-dk); border: 1px solid var(--green-bd); }
.xo-alert.amber { background: var(--amber-lt); color: #92400e; border: 1px solid rgba(245,158,11,0.2); }

/* ── Code box ── */
.xo-code {
  background: var(--ink); border-radius: 6px; padding: 20px 22px;
  font-size: 12px; line-height: 1.85; color: rgba(255,255,255,0.5);
  position: relative; margin-bottom: 20px; font-family: var(--font-mono);
}
.xo-code .kw { color: var(--green); }
.xo-code .str { color: #a8e6b8; }
.xo-code .cm { color: rgba(255,255,255,0.2); font-style: italic; }
.xo-copy-tag {
  position: absolute; top: 10px; right: 12px;
  font-size: 10px; padding: 3px 8px; border-radius: 3px;
  background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4);
  cursor: pointer; letter-spacing: 0.04em;
}
.xo-copy-tag:hover { background: rgba(255,255,255,0.14); color: #fff; }

/* ── Check list ── */
.xo-checks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.xo-check { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--surface); border-radius: 4px; }
.xo-check-ic { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
.xo-check-ic.ok { background: var(--green-lt); color: var(--green-dk); }
.xo-check-ic.pending { background: var(--amber-lt); color: var(--amber); }
.xo-check-label { font-size: 13px; color: var(--ink); flex: 1; }
.xo-ob-btns { display: flex; gap: 10px; margin-top: 4px; }
.xo-ob-btn {
  font-family: var(--font-mono); font-size: 12px; font-weight: 500;
  padding: 11px 28px; border-radius: 4px; cursor: pointer;
  letter-spacing: 0.02em; transition: all 0.15s; border: none;
}
.xo-ob-btn.p { background: var(--ink); color: var(--white); }
.xo-ob-btn.p:hover { background: var(--green); }
.xo-ob-btn.s { background: transparent; color: var(--ink-60); border: 1px solid var(--ink-12); }
.xo-ob-btn.s:hover { color: var(--ink); border-color: var(--ink-30); }

/* ── First savings ── */
.xo-first-save {
  min-height: calc(100vh - 42px); display: flex; align-items: center; justify-content: center;
  background: var(--ink); flex-direction: column; padding: 60px 40px; text-align: center;
}
.xo-save-num { font-size: 72px; font-weight: 500; color: var(--green); letter-spacing: -0.05em; line-height: 1; margin-bottom: 8px; }
.xo-save-label { font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 32px; letter-spacing: 0.06em; text-transform: uppercase; }
.xo-first-save h2 { font-size: 28px; font-weight: 500; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; }
.xo-first-save p { font-size: 14px; color: rgba(255,255,255,0.4); max-width: 440px; line-height: 1.7; margin-bottom: 40px; }
.xo-first-stats { display: flex; gap: 40px; margin-bottom: 48px; }
.xo-first-stat-n { font-size: 28px; font-weight: 500; color: #fff; letter-spacing: -0.03em; }
.xo-first-stat-l { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; }
.xo-first-btn {
  font-family: var(--font-mono); font-size: 13px; font-weight: 500;
  padding: 14px 36px; background: var(--green); color: var(--ink);
  border: none; border-radius: 4px; cursor: pointer; letter-spacing: 0.02em;
  transition: background 0.2s;
}
.xo-first-btn:hover { background: var(--green-hover); }
.xo-at-rate { font-size: 12px; color: rgba(255,255,255,0.25); margin-bottom: 32px; }
.xo-at-rate span { color: var(--green); font-weight: 500; }

@media (max-width: 768px) {
  .xo-plan-grid { grid-template-columns: 1fr; }
  .xo-ob-sidebar { display: none; }
  .xo-ob-main { padding: 24px 20px; }
}
`;

const STEPS = ["Sign up", "Choose plan", "Add domain", "Install Worker", "Verify", "First savings"];

const WORKER_CODE = `<span class="cm">// XOXO Worker — techcrunch.com</span>
<span class="kw">const</span> XOXO_KEY = <span class="str">"xo_live_sk_tc_a8f3c92d1e4b"</span>;

<span class="kw">export default</span> {
  <span class="kw">async</span> fetch(request, env) {
    <span class="kw">const</span> res = <span class="kw">await</span> fetch(<span class="str">"https://edge.xoxo.ai/v1/classify"</span>, {
      method: <span class="str">"POST"</span>,
      headers: {
        <span class="str">"Authorization"</span>: <span class="str">\`Bearer \${XOXO_KEY}\`</span>,
        <span class="str">"X-URL"</span>: request.url,
        <span class="str">"X-UA"</span>: request.headers.get(<span class="str">"user-agent"</span>) || <span class="str">""</span>,
        <span class="str">"X-IP"</span>: request.headers.get(<span class="str">"cf-connecting-ip"</span>) || <span class="str">""</span>,
      }
    });
    <span class="kw">const</span> { action, payload } = <span class="kw">await</span> res.json();
    <span class="kw">if</span> (action === <span class="str">"serve_cache"</span>) <span class="kw">return new</span> Response(payload, { status: 200 });
    <span class="kw">if</span> (action === <span class="str">"block"</span>) <span class="kw">return new</span> Response(<span class="str">"403"</span>, { status: 403 });
    <span class="kw">return</span> fetch(request); <span class="cm">// pass through to origin</span>
  }
}`;

function StepBar({ step, setStep }) {
  return (
    <div className="xo-wiz-bar">
      <div className="xo-wiz-logo">XOXO<em>.</em></div>
      <div className="xo-wiz-steps">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`xo-wiz-step${i === step ? " active" : i < step ? " done" : ""}`}
            onClick={() => i < step && setStep(i)}
          >
            <div className="xo-wiz-dot" />
            {s}
          </div>
        ))}
      </div>
      {step < STEPS.length - 1 && (
        <div className="xo-wiz-next" onClick={() => setStep(Math.min(step + 1, STEPS.length - 1))}>
          Next screen →
        </div>
      )}
    </div>
  );
}

function ObSidebar({ step: obStep, plan }) {
  const items = [
    { label: "Create account", sub: "Done" },
    { label: "Choose plan", sub: plan ? `${plan} plan` : "Choose plan" },
    { label: "Add your domain", sub: "Tell us where you live" },
    { label: "Install Worker", sub: "5 minute setup" },
    { label: "Verify connection", sub: "Almost there" },
  ];
  return (
    <div className="xo-ob-sidebar">
      <div className="xo-ob-logo">XOXO<em>.</em></div>
      <div className="xo-ob-steps">
        {items.map(({ label, sub }, i) => {
          const state = i < obStep ? "done" : i === obStep ? "active" : "todo";
          return (
            <div key={label} className={`xo-ob-step ${state}`}>
              <div className={`xo-ob-circle ${state}`}>{state === "done" ? "✓" : i + 1}</div>
              <div>
                <div className="xo-ob-step-title">{label}</div>
                <div className="xo-ob-step-sub">{sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SignupWizard() {
  const [step, setStep]     = useState(0);
  const [plan, setPlan]     = useState("Publisher");
  const [domain, setDomain] = useState("techcrunch.com");
  const [copied, setCopied] = useState(false);

  const go = (n) => setStep(n);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  const handleCopy = () => {
    navigator.clipboard?.writeText("// XOXO Worker script").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{css}</style>
      <StepBar step={step} setStep={setStep} />

      {/* STEP 0 — SIGN UP */}
      {step === 0 && (
        <div className="xo-wiz-screen">
          <div className="xo-auth-wrap">
            <div className="xo-auth-card fade-in">
              <div className="xo-auth-logo">XOXO<em>.</em></div>
              <div className="xo-auth-title">Create your account</div>
              <div className="xo-auth-sub">Start saving on bot traffic in under 10 minutes.</div>

              <button className="xo-social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button className="xo-social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>

              <div className="xo-divider"><span>or with email</span></div>
              <div className="xo-field"><label>Work email</label><input type="email" placeholder="you@yoursite.com" /></div>
              <div className="xo-field"><label>Password</label><input type="password" placeholder="8+ characters" /></div>
              <div className="xo-field"><label>Company / publication name</label><input type="text" placeholder="TechCrunch" /></div>
              <button className="xo-btn-auth" onClick={next}>Create account →</button>
              <div className="xo-auth-footer">Already have an account? <Link href="/login">Sign in</Link></div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1 — PLAN PICKER */}
      {step === 1 && (
        <div className="xo-wiz-screen">
          <div className="xo-plan-wrap">
            <div className="xo-auth-logo" style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>XOXO<em>.</em></div>
            <div className="xo-plan-title">Choose your plan</div>
            <div className="xo-plan-sub">Start free. Upgrade anytime. Pay a fraction of what you save.</div>
            <div className="xo-plan-grid">
              {[
                { tag: "Starter", name: "Free", price: "$0", period: "/ month · up to 5M visits", feats: ["Bot classification", "Edge cache routing", "llms.txt auto-gen", "7-day savings history", "Email support"] },
                { tag: "Most popular", name: "Publisher", price: "$499", period: "/ month · up to 50M visits", feats: ["Everything in Free", "Advanced fingerprinting", "Per-bot policy controls", "Full savings dashboard", "Priority support"] },
                { tag: "Enterprise", name: "Custom", price: "Talk to us", period: "/ month · unlimited visits", feats: ["Everything in Publisher", "Dedicated edge nodes", "Custom SLAs", "SSO + audit logs", "White-glove setup"] },
              ].map(({ tag, name, price, period, feats }) => (
                <div key={name} className={`xo-plan-opt${plan === name ? " sel" : ""}`} onClick={() => setPlan(name)}>
                  <div className="xo-plan-tag">{tag}</div>
                  <div className="xo-plan-name">{name}</div>
                  <div className="xo-plan-price" style={name === "Custom" ? { fontSize: 22, paddingTop: 4 } : {}}>{price}</div>
                  <div className="xo-plan-period">{period}</div>
                  <ul className="xo-plan-feats">{feats.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="xo-plan-actions">
              <button className="xo-btn-auth" style={{ maxWidth: 200 }} onClick={next}>Start with {plan} →</button>
              {plan !== "Free" && <button className="xo-btn-auth" style={{ maxWidth: 160, background: "transparent", color: "var(--ink-60)", border: "1px solid var(--ink-12)" }} onClick={() => { setPlan("Free"); next(); }}>Start free</button>}
            </div>
            <div className="xo-plan-hint">14-day free trial · No card required to start · Cancel anytime</div>
          </div>
        </div>
      )}

      {/* STEP 2 — ADD DOMAIN */}
      {step === 2 && (
        <div className="xo-wiz-screen">
          <div className="xo-ob-wrap">
            <ObSidebar step={0} plan={plan} />
            <div className="xo-ob-main">
              <div className="xo-ob-step-num">Step 3 of 5</div>
              <div className="xo-ob-title">Add your domain</div>
              <div className="xo-ob-desc">Enter the domain you want to protect. XOXO will intercept bot traffic here and start saving you money immediately.</div>
              <div className="xo-domain-row">
                <input type="text" placeholder="techcrunch.com" value={domain} onChange={(e) => setDomain(e.target.value)} />
                <button onClick={next}>Continue →</button>
              </div>
              <div className="xo-alert green">
                <div>✓</div>
                <div><strong>{domain}</strong> — domain is valid and reachable. We detected Cloudflare on this domain. Recommended: use the Cloudflare Worker method.</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-30)", marginTop: 8, maxWidth: 440, lineHeight: 1.6 }}>
                You can add more domains later. XOXO works on any domain that routes traffic through Cloudflare, Fastly, Vercel, or nginx.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — INSTALL WORKER */}
      {step === 3 && (
        <div className="xo-wiz-screen">
          <div className="xo-ob-wrap">
            <ObSidebar step={1} plan={plan} />
            <div className="xo-ob-main">
              <div className="xo-ob-step-num">Step 4 of 5</div>
              <div className="xo-ob-title">Install the XOXO Worker</div>
              <div className="xo-ob-desc">
                We detected Cloudflare on <strong>{domain}</strong>. Go to your Cloudflare dashboard → Workers &amp; Pages → Create, paste the script below, and add the route{" "}
                <code style={{ background: "var(--surface)", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>{domain}/*</code>
              </div>
              <div className="xo-code">
                <span className="xo-copy-tag" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</span>
                <div dangerouslySetInnerHTML={{ __html: WORKER_CODE }} />
              </div>
              <div className="xo-ob-btns">
                <button className="xo-ob-btn p" onClick={next}>I&apos;ve deployed the Worker →</button>
                <button className="xo-ob-btn s">Need help?</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 — VERIFY */}
      {step === 4 && (
        <div className="xo-wiz-screen">
          <div className="xo-ob-wrap">
            <ObSidebar step={2} plan={plan} />
            <div className="xo-ob-main">
              <div className="xo-ob-step-num">Step 5 of 5</div>
              <div className="xo-ob-title">Verifying your connection</div>
              <div className="xo-ob-desc">XOXO is sending test requests to {domain} to confirm everything is working correctly.</div>
              <div className="xo-checks">
                {[
                  "Worker is deployed and reachable",
                  "API key authenticated",
                  "Bot test request intercepted correctly",
                  "Origin server not hit during bot test",
                  `llms.txt generated at ${domain}/llms.txt`,
                  "Live traffic flowing to dashboard",
                ].map((label) => (
                  <div key={label} className="xo-check">
                    <div className="xo-check-ic ok">✓</div>
                    <div className="xo-check-label">{label}</div>
                  </div>
                ))}
              </div>
              <div className="xo-alert green" style={{ maxWidth: 480 }}>
                <div>✓</div>
                <div>All checks passed. XOXO is live on {domain}. Your first bot was detected <strong>8 seconds ago</strong>.</div>
              </div>
              <button className="xo-ob-btn p" style={{ marginTop: 16 }} onClick={next}>See your first savings →</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5 — FIRST SAVINGS */}
      {step === 5 && (
        <div className="xo-wiz-screen">
          <div className="xo-first-save">
            <div className="xo-save-num count-up">$0.12</div>
            <div className="xo-save-label">Saved in the last 60 seconds</div>
            <h2>XOXO is working.</h2>
            <p>In the first minute alone, we intercepted 847 bot requests that would have hit your origin server. The savings compound every hour.</p>
            <div className="xo-first-stats">
              <div><div className="xo-first-stat-n">847</div><div className="xo-first-stat-l">Bots intercepted</div></div>
              <div><div className="xo-first-stat-n">0</div><div className="xo-first-stat-l">Origin hits</div></div>
              <div><div className="xo-first-stat-n">2.3<span style={{ fontSize: 18 }}>MB</span></div><div className="xo-first-stat-l">Bandwidth saved</div></div>
            </div>
            <div className="xo-at-rate">At this rate, XOXO will save you approximately <span>$5,200 this month</span></div>
            <Link href="/app" className="xo-first-btn">Go to dashboard →</Link>
          </div>
        </div>
      )}
    </>
  );
}
