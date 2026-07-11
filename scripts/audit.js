import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const files = ["index.html", "styles.css", "favicon.svg", "robots.txt", "sitemap.xml", "og-image.svg"];
const sizes = {};
let total = 0;

for (const file of files) {
  const info = await stat(join(dist, file));
  sizes[file] = info.size;
  total += info.size;
}

const html = await readFile(join(dist, "index.html"), "utf8");
const css = await readFile(join(dist, "styles.css"), "utf8");
const anchors = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const internalLinks = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((match) => match[1]);
const images = [...html.matchAll(/(?:src|href)="([^"]+\.(?:svg|png|jpg|jpeg|webp))"/g)].map((match) => match[1]);

const mediaQueries = (css.match(/@media/g) || []).length;
const focusStates = css.includes(":focus-visible");
const reducedMotion = css.includes("prefers-reduced-motion");
const ogTags = (html.match(/property="og:/g) || []).length;

const estimatedFastConnectionMs = Math.ceil((total / 250000) * 1000);
const estimatedSlowConnectionMs = Math.ceil((total / 50000) * 1000);

console.log(JSON.stringify({
  files,
  sizes,
  totalBytes: total,
  totalKb: Number((total / 1024).toFixed(2)),
  internalAnchorCount: internalLinks.length,
  externalLinkCount: externalLinks.length,
  imageReferenceCount: images.length,
  routeFiles: ["/", "/robots.txt", "/sitemap.xml", "/favicon.svg"],
  seo: {
    title: /<title>/.test(html),
    description: /name="description"/.test(html),
    canonical: /rel="canonical"/.test(html),
    openGraphTags: ogTags,
    twitterCard: /name="twitter:card"/.test(html),
    robots: true,
    sitemap: true,
  },
  responsive: {
    mediaQueries,
    focusStates,
    reducedMotion,
  },
  performanceEstimate: {
    fastConnectionMs: estimatedFastConnectionMs,
    slowConnectionMs: estimatedSlowConnectionMs,
    jsBytes: 0,
  },
  accessibility: {
    lang: /<html lang="en">/.test(html),
    viewport: /name="viewport"/.test(html),
    labelledSections: (html.match(/aria-labelledby/g) || []).length,
    focusVisible: focusStates,
    reducedMotion,
  },
}, null, 2));
