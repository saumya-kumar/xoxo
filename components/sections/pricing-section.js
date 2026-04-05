import Link from "next/link";

const css = `
.xo-pricing-bg { background: var(--mid); }
.xo-pricing-inner { max-width: 960px; margin: 0 auto; padding: 100px 48px; }
.xo-plans {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 2px; margin-top: 56px;
  background: var(--ink-06); border: 1px solid var(--ink-06);
}
.xo-plan { background: var(--white); padding: 36px; transition: background 0.2s; }
.xo-plan:hover { background: var(--mid); }
.xo-plan.featured { background: var(--ink); }
.xo-plan.featured:hover { background: #1a1a1a; }
.xo-plan-name {
  font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-40); margin-bottom: 20px;
}
.xo-plan.featured .xo-plan-name { color: rgba(255,255,255,0.4); }
.xo-plan-price {
  font-size: 40px; font-weight: 500; letter-spacing: -0.04em;
  color: var(--ink); line-height: 1; margin-bottom: 4px;
}
.xo-plan.featured .xo-plan-price { color: var(--green); }
.xo-plan-period { font-size: 12px; color: var(--ink-40); margin-bottom: 28px; }
.xo-plan.featured .xo-plan-period { color: rgba(255,255,255,0.35); }
.xo-plan-div { height: 1px; background: var(--ink-06); margin-bottom: 24px; }
.xo-plan.featured .xo-plan-div { background: rgba(255,255,255,0.08); }
.xo-plan-features {
  list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;
}
.xo-plan-features li { font-size: 13px; color: var(--ink-40); display: flex; gap: 10px; }
.xo-plan.featured .xo-plan-features li { color: rgba(255,255,255,0.5); }
.xo-plan-features li::before { content: '—'; color: var(--green); flex-shrink: 0; }
.xo-plan-cta {
  display: block; text-align: center; font-family: var(--font-mono); font-size: 12px;
  padding: 12px; border: 1px solid var(--ink-06); color: var(--ink-40);
  text-decoration: none; border-radius: 3px; letter-spacing: 0.04em; transition: all 0.2s;
}
.xo-plan-cta:hover { border-color: var(--ink); color: var(--ink); }
.xo-plan.featured .xo-plan-cta { border-color: var(--green); color: var(--green); }
.xo-plan.featured .xo-plan-cta:hover { background: var(--green); color: var(--ink); }
@media (max-width: 768px) {
  .xo-pricing-inner { padding: 60px 20px; }
  .xo-plans { grid-template-columns: 1fr; }
}
`;

const PLANS = [
  {
    name: "Starter",
    price: "$99",
    period: "/ month · up to 5M visits",
    features: ["Bot classification", "Edge cache routing", "llms.txt auto-generation", "Savings dashboard", "Email support"],
    cta: "Get started",
    href: "/signup",
  },
  {
    name: "Publisher",
    price: "$499",
    period: "/ month · up to 50M visits",
    features: ["Everything in Starter", "Advanced bot fingerprinting", "Policy controls per bot type", "Real-time savings reporting", "Priority support"],
    cta: "Start free trial",
    href: "/signup",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/ month · unlimited visits",
    features: ["Everything in Publisher", "Dedicated edge nodes", "Custom SLAs", "SSO + audit logs", "White-glove onboarding"],
    cta: "Talk to us",
    href: "/signup",
  },
];

export default function PricingSection({ showIntro = true }) {
  return (
    <>
      <style>{css}</style>
      <div className="xo-pricing-bg">
        <div className="xo-pricing-inner reveal" id="pricing">
          <div className="xo-eyebrow">Pricing</div>
          <h2 className="xo-section-title">Pay a fraction of<br /><strong>what you save.</strong></h2>
          {showIntro && (
            <p className="xo-section-body">
              Simple SaaS pricing. No revenue share. No AI company middlemen. Just a
              monthly fee that&apos;s always a fraction of your monthly savings.
            </p>
          )}
          <div className="xo-plans">
            {PLANS.map(({ name, price, period, features, cta, href, featured }) => (
              <div key={name} className={`xo-plan${featured ? " featured" : ""}`}>
                <div className="xo-plan-name">{name}</div>
                <div className="xo-plan-price">{price}</div>
                <div className="xo-plan-period">{period}</div>
                <div className="xo-plan-div" />
                <ul className="xo-plan-features">
                  {features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href={href} className="xo-plan-cta">{cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
