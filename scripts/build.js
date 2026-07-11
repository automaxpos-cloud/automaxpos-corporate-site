import { cp, mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "src");
const publicDir = join(root, "public");
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });
await cp(publicDir, dist, { recursive: true });

const files = ["index.html", "styles.css", "favicon.svg", "robots.txt", "sitemap.xml", "og-image.svg"];
let totalBytes = 0;
for (const file of files) {
  const info = await stat(join(dist, file));
  totalBytes += info.size;
  console.log(`${file}: ${info.size} bytes`);
}

console.log(`Production build complete: ${dist}`);
console.log(`Total checked asset size: ${totalBytes} bytes`);
