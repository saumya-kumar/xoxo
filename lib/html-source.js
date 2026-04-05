import { cache } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_FILES = {
  landing: "xoxo-landing (1).html",
  journey: "xoxo-journey.html",
};

function parsePrototypeHtml(html) {
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!styleMatch || !bodyMatch) {
    throw new Error("Could not extract the prototype styles and body.");
  }

  return {
    styles: styleMatch[1].trim(),
    bodyHtml: bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, "").trim(),
  };
}

function rewriteJourneyHandlers(bodyHtml) {
  return bodyHtml
    .replace(/onclick="go\(/g, 'onclick="window.xoxoJourneyGo(')
    .replace(/onclick="next\(\)"/g, 'onclick="window.xoxoJourneyNext()"')
    .replace(/onclick="dp\(/g, 'onclick="window.xoxoJourneySelectPage(');
}

export const getPrototypePage = cache((key) => {
  const sourceFile = SOURCE_FILES[key];

  if (!sourceFile) {
    throw new Error(`Unknown prototype source: ${key}`);
  }

  const source = readFileSync(join(process.cwd(), sourceFile), "utf8");
  const page = parsePrototypeHtml(source);

  if (key === "journey") {
    return {
      ...page,
      bodyHtml: rewriteJourneyHandlers(page.bodyHtml),
    };
  }

  return page;
});
