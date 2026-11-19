import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Keep the originals. Generate responsive derivatives reproducibly at build time.
const source = 'public/images/realisations-20261010';
const destination = 'public/images/optimized-realisations';
await mkdir(destination, { recursive: true });
let originalBytes = 0;
let desktopBytes = 0;
let mobileBytes = 0;
for (const filename of (await readdir(source)).sort()) {
  if (!/\.(png|jpg|jpeg)$/i.test(filename)) continue;
  const input = path.join(source, filename);
  const basename = path.parse(filename).name;
  originalBytes += (await stat(input)).size;
  for (const width of [480, 960]) {
    const output = path.join(destination, `${basename}-${width}.webp`);
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(output);
    const bytes = (await stat(output)).size;
    if (width === 960) desktopBytes += bytes; else mobileBytes += bytes;
  }
}
console.log(JSON.stringify({ originalBytes, desktopBytes, mobileBytes }));

// The homepage uses the full original framing; only the resolution varies.
const heroOriginal = 'src/assets/hero-nettoyage.jpg';
const heroDestination = 'public/images/hero-home';
await mkdir(heroDestination, { recursive: true });
const heroUpdatedAt = Math.max((await stat(heroOriginal)).mtimeMs, (await stat(new URL(import.meta.url))).mtimeMs);
for (const width of [640, 960, 1440, 1920, 3200]) {
  const output = path.join(heroDestination, `clean-fresh-${width}.avif`);
  const existing = await stat(output).catch(error => {
    if (error.code !== 'ENOENT') throw error;
  });
  if (existing?.size && existing.mtimeMs >= heroUpdatedAt) continue;
  await sharp(heroOriginal).rotate().resize({ width, withoutEnlargement: true })
    .avif({ quality: 58, effort: 2 }).toFile(output);
}
