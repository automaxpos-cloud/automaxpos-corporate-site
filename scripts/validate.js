import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const html = await readFile(join(dist, "index.html"), "utf8");
const required = [
  ["browser title", /<title>AutoMax POS \| JP Max Technologies<\/title>/],
  ["description", /<meta\s+name="description"/],
  ["canonical", /<link\s+rel="canonical"\s+href="https:\/\/automaxpos\.com\/"/],
  ["favicon", /<link\s+rel="icon"\s+href="\/favicon\.svg"/],
  ["open graph title", /property="og:title"/],
  ["open graph image", /property="og:image"\s+content="https:\/\/automaxpos\.com\/og-image\.svg"/],
  ["twitter card", /name="twitter:card"/],
  ["viewport", /name="viewport"/],
];

const failures = [];
for (const [label, pattern] of required) {
  if (!pattern.test(html)) failures.push(`Missing ${label}`);
}

const anchorIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const internalLinks = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const link of internalLinks) {
  if (!anchorIds.has(link)) failures.push(`Broken anchor #${link}`);
}

const imageRefs = [...html.matchAll(/(?:src|href)="([^"]+\.(?:svg|png|jpg|jpeg|webp))"/g)]
  .map((match) => match[1])
  .filter((asset) => !asset.startsWith("http"));

const assetPaths = ["styles.css", "favicon.svg", "robots.txt", "sitemap.xml", "og-image.svg"];
for (const image of imageRefs) {
  assetPaths.push(image.replace(/^\//, ""));
}

for (const asset of [...new Set(assetPaths)]) {
  try {
    const info = await stat(join(dist, asset));
    if (!info.isFile() || info.size === 0) failures.push(`Invalid asset ${asset}`);
  } catch {
    failures.push(`Missing asset ${asset}`);
  }
}

const robots = await readFile(join(dist, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://automaxpos.com/sitemap.xml")) {
  failures.push("robots.txt missing sitemap reference");
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
if (!sitemap.includes("<loc>https://automaxpos.com/</loc>")) {
  failures.push("sitemap.xml missing homepage");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Validation passed: metadata, routes, screenshots, assets, robots, sitemap, and internal links.");
