import { NextResponse } from "next/server";

/**
 * Subdomain routing middleware.
 *
 * Modes:
 *  1. Custom domains configured (NEXT_PUBLIC_APP_DOMAIN set):
 *     app.xoxo.ai  → rewrites internally to /app/*
 *     xoxo.ai/app  → redirects to app.xoxo.ai
 *
 *  2. Single domain / Vercel preview URL (no custom domain yet):
 *     All traffic served on one host.
 *     /app/* routes work directly — no subdomain redirect.
 *     This is the default until you add custom domains.
 */

const APP_DOMAIN  = process.env.NEXT_PUBLIC_APP_DOMAIN;   // e.g. "app.xoxo.ai"
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;  // e.g. "xoxo.ai"

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  // ── Custom subdomain mode (only when both env vars are set) ───────────────
  const customDomainsConfigured = APP_DOMAIN && ROOT_DOMAIN;

  if (customDomainsConfigured) {
    const isAppSubdomain =
      hostname === APP_DOMAIN ||
      request.nextUrl.searchParams.get("_host") === "app";

    // On app.xoxo.ai — rewrite to /app/* internally
    if (isAppSubdomain) {
      if (pathname.startsWith("/app")) return NextResponse.next();
      const url = request.nextUrl.clone();
      url.searchParams.delete("_host");
      url.pathname = pathname === "/" ? "/app" : `/app${pathname}`;
      return NextResponse.rewrite(url);
    }

    // On xoxo.ai — redirect /app/* to app.xoxo.ai
    if (pathname.startsWith("/app")) {
      const url = request.nextUrl.clone();
      url.host = APP_DOMAIN;
      url.pathname = pathname.replace(/^\/app/, "") || "/";
      return NextResponse.redirect(url);
    }
  }

  // ── Single-domain / preview mode — just pass everything through ───────────
  // /app/* works directly via path — no subdomain needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
