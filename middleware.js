import { NextResponse } from "next/server";

/**
 * Subdomain routing middleware.
 *
 * Production (Vercel):
 *   app.xoxo.ai  → internally rewrites to /app/* pages
 *   xoxo.ai      → marketing pages (no rewrite)
 *
 * Local dev — set NEXT_PUBLIC_SUBDOMAIN=app in your env or
 * visit http://localhost:3000 normally (dashboard at /app/*).
 *
 * Vercel config required:
 *   Add both xoxo.ai and app.xoxo.ai as custom domains on the same
 *   Vercel project — middleware handles the split at runtime.
 */

const APP_DOMAIN  = process.env.NEXT_PUBLIC_APP_DOMAIN  ?? "app.xoxo.ai";
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "xoxo.ai";

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  // ── Determine which subdomain we're on ──────────────────────────────────
  const isAppSubdomain =
    hostname === APP_DOMAIN ||
    hostname.startsWith("app.") ||
    // Local override: ?_host=app simulates app.xoxo.ai in dev
    request.nextUrl.searchParams.get("_host") === "app";

  // ── app.xoxo.ai ─────────────────────────────────────────────────────────
  if (isAppSubdomain) {
    // Already an /app/* path — don't double-prefix
    if (pathname.startsWith("/app")) {
      return NextResponse.next();
    }

    // Strip _host param before rewriting
    const url = request.nextUrl.clone();
    url.searchParams.delete("_host");

    // / → /app, /traffic → /app/traffic, etc.
    url.pathname = pathname === "/" ? "/app" : `/app${pathname}`;
    return NextResponse.rewrite(url);
  }

  // ── xoxo.ai — marketing site ─────────────────────────────────────────────
  // If someone somehow hits /app/* on the marketing domain, redirect to app
  if (pathname.startsWith("/app")) {
    const url = request.nextUrl.clone();
    url.host = `app.${hostname.replace(/^www\./, "")}`;
    url.pathname = pathname.replace(/^\/app/, "") || "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next internals and static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
