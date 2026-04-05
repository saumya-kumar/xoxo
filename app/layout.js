import "./globals.css";

export const metadata = {
  title: { default: "XOXO — Stop paying for bots", template: "%s | XOXO" },
  description:
    "XOXO cuts your server bill 30–60% by intercepting AI bot traffic at the edge. Publishers and e-commerce sites save thousands per month automatically.",
  openGraph: {
    title: "XOXO — Intelligent compute savings for publishers",
    description: "Stop paying for AI bots that never pay. XOXO intercepts bot traffic at the edge, serving cached responses so your origin server never has to do the work.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
