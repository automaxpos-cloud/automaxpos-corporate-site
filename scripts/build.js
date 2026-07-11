import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "src");
const publicDir = join(root, "public");
const dist = join(root, "dist");
const serverSource = join(src, "server");
const serverDist = join(dist, "server");
const serverPublic = join(serverDist, "public");

async function listFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(absolute, relative));
    } else {
      files.push(relative);
    }
  }
  return files.sort();
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });
await cp(publicDir, dist, { recursive: true });
await rm(join(dist, "server"), { recursive: true, force: true });
await mkdir(serverPublic, { recursive: true });
await cp(src, serverPublic, { recursive: true });
await cp(publicDir, serverPublic, { recursive: true });
await rm(join(serverPublic, "server"), { recursive: true, force: true });
await cp(serverSource, serverDist, { recursive: true });

const files = await listFiles(dist);
let totalBytes = 0;
for (const file of files) {
  const info = await stat(join(dist, file));
  totalBytes += info.size;
  console.log(`${file}: ${info.size} bytes`);
}

console.log(`Production build complete: ${dist}`);
console.log(`Total asset size: ${totalBytes} bytes`);
