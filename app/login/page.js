import Link from "next/link";

export const metadata = { title: "Sign in" };

const css = `
.xo-auth-wrap {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
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
.xo-forgot { font-size: 11px; color: var(--ink-30); display: block; text-align: right; margin-top: -8px; margin-bottom: 16px; }
.xo-forgot:hover { color: var(--green); }
`;

export default function LoginPage() {
  return (
    <>
      <style>{css}</style>
      <div className="xo-auth-wrap">
        <div className="xo-auth-card fade-in">
          <Link href="/" className="xo-auth-logo">XOXO<em>.</em></Link>
          <div className="xo-auth-title">Welcome back</div>
          <div className="xo-auth-sub">Sign in to your XOXO dashboard.</div>

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

          <div className="xo-field">
            <label>Email</label>
            <input type="email" placeholder="you@yoursite.com" />
          </div>
          <div className="xo-field">
            <label>Password</label>
            <input type="password" placeholder="Your password" />
          </div>
          <Link href="#" className="xo-forgot">Forgot password?</Link>

          <Link href="/app" className="xo-btn-auth" style={{ display: "block", textAlign: "center" }}>
            Sign in →
          </Link>

          <div className="xo-auth-footer">
            No account? <Link href="/signup">Sign up for free</Link>
          </div>
        </div>
      </div>
    </>
  );
}
