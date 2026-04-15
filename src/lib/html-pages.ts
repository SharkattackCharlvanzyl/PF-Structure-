import fs from "fs";
import path from "path";

const htmlSourceDirectory = path.join(process.cwd(), "html-originals");

const routeOverrides: Record<string, string[]> = {
  "agency.html": ["agreement"],
  "valuation.html": ["valuate"],
  "business (4).html": ["business-(4)"],
  "propworths-features (2).html": ["propworths-features-(2)"],
  "seller agent listing.html": ["seller-agent-listing"],
  "seller-agent-listing.html": ["seller-agent-listing"],
};

function normalizeHtmlName(fileName: string): string {
  return fileName.trim();
}

function fileNameRouteSegments(fileName: string): string[] {
  const normalized = normalizeHtmlName(fileName);
  if (routeOverrides[normalized]) {
    return routeOverrides[normalized];
  }

  const baseName = normalized.replace(/\.html$/i, "");
  const normalizedBase = baseName.trim();
  const hyphenized = normalizedBase.replace(/\s+/g, "-").toLowerCase();

  if (hyphenized === "index") {
    return [];
  }
  if (hyphenized.startsWith("auctions-")) {
    return ["auctions", hyphenized.replace(/^auctions-/, "")];
  }
  if (hyphenized.startsWith("auction-")) {
    return ["auctions", hyphenized.replace(/^auction-/, "")];
  }
  if (hyphenized.startsWith("buy-")) {
    return ["buy", hyphenized.replace(/^buy-/, "")];
  }
  if (hyphenized.startsWith("business-")) {
    return ["business", hyphenized.replace(/^business-/, "")];
  }
  if (hyphenized.startsWith("rent-")) {
    return ["rent", hyphenized.replace(/^rent-/, "")];
  }

  return [hyphenized];
}

function buildRouteMap() {
  const routeMap = new Map<string, string>();
  for (const fileName of fs.readdirSync(htmlSourceDirectory)) {
    if (!fileName.toLowerCase().endsWith(".html")) {
      continue;
    }
    const segments = fileNameRouteSegments(fileName);
    if (segments.length === 0) {
      continue;
    }
    const routeKey = segments.join("/");
    if (!routeMap.has(routeKey)) {
      routeMap.set(routeKey, fileName);
    }
  }
  return routeMap;
}

const routeToFileMap = buildRouteMap();

export function getAllHtmlRoutes() {
  return Array.from(routeToFileMap.keys()).map((routeKey) => ({ slug: routeKey.split("/") }));
}

export function getFileNameForRoute(slug: string[]) {
  return routeToFileMap.get(slug.join("/"));
}

export function loadHtmlPage(fileName: string) {
  const filePath = path.join(htmlSourceDirectory, fileName);
  const raw = fs.readFileSync(filePath, "utf8");

  const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/i);
  const headMatch = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const headHtml = headMatch?.[1] ?? "";
  const styleMatches = Array.from(headHtml.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi), (m) => m[0]);
  const styles = styleMatches.join("\n");

  const bodyHtml = bodyMatch?.[1] ?? raw;

  return {
    title: titleMatch?.[1].trim() ?? undefined,
    styles,
    bodyHtml,
  };
}

export function getRouteTitle(slug: string[]) {
  const fileName = getFileNameForRoute(slug);
  if (!fileName) {
    return undefined;
  }
  return loadHtmlPage(fileName).title;
}
