/** Keep the existing single-attachment delivery: one PDF page per selected photo. */
export const MAX_QUOTE_PHOTOS = 10;
const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
export function validateQuotePhotos(files: File[]): string | null {
  if (files.length > MAX_QUOTE_PHOTOS) return 'Vous pouvez joindre 10 photos maximum.';
  if (files.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type))) return 'Choisissez des photos JPG, PNG ou WebP.';
  if (files.some(file => file.size > MAX_SOURCE_BYTES)) return 'Chaque photo doit peser moins de 20 Mo.';
  return null;
}

export function photoPdf(pages: { bytes: Uint8Array; width: number; height: number }[]): Uint8Array<ArrayBuffer> {
  const encode = (text: string) => new TextEncoder().encode(text);
  const chunks: Uint8Array[] = [];
  const offsets = [0];
  let length = 0;
  const append = (part: Uint8Array) => { chunks.push(part); length += part.length; };
  const object = (id: number, parts: (string | Uint8Array)[]) => {
    offsets[id] = length;
    append(encode(`${id} 0 obj\n`));
    for (const part of parts) append(typeof part === 'string' ? encode(part) : part);
    append(encode('\nendobj\n'));
  };
  append(encode('%PDF-1.4\n'));
  object(1, ['<< /Type /Catalog /Pages 2 0 R >>']);
  object(2, [`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] >>`]);
  pages.forEach((page, i) => {
    const id = 3 + i * 3;
    const scale = Math.min(555 / page.width, 802 / page.height);
    const w = page.width * scale, h = page.height * scale;
    const content = `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${((595 - w) / 2).toFixed(2)} ${((842 - h) / 2).toFixed(2)} cm /Photo Do Q`;
    object(id, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Photo ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R >>`]);
    object(id + 1, [`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`, page.bytes, '\nendstream']);
    object(id + 2, [`<< /Length ${encode(content).length} >>\nstream\n${content}\nendstream`]);
  });
  const xref = length;
  append(encode(`xref\n0 ${offsets.length}\n0000000000 65535 f \n${offsets.slice(1).map(n => `${String(n).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`));
  const output = new Uint8Array(length);
  let cursor = 0;
  for (const chunk of chunks) { output.set(chunk, cursor); cursor += chunk.length; }
  return output;
}

export async function prepareQuotePhotos(files: File[]): Promise<File | null> {
  const error = validateQuotePhotos(files);
  if (error) throw new Error(error);
  if (!files.length) return null;
  const pages: { bytes: Uint8Array; width: number; height: number }[] = [];
  // Decode sequentially to limit memory on mobile. No originals leave the device.
  for (const file of files) {
    let bitmap: ImageBitmap;
    try { bitmap = await createImageBitmap(file); }
    catch { throw new Error('Une photo est illisible. Choisissez une autre photo ou envoyez votre demande sans photo.'); }
    try {
      const ratio = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
      canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Impossible de préparer les photos sur cet appareil. Vous pouvez envoyer votre demande sans photo.');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      let jpeg: Blob | null = null;
      for (const quality of [0.8, 0.65, 0.5, 0.35]) {
        jpeg = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
        if (jpeg && jpeg.size <= 200_000) break;
      }
      if (!jpeg || jpeg.size > 200_000) throw new Error('Une photo reste trop volumineuse. Choisissez une version plus légère.');
      pages.push({ bytes: new Uint8Array(await jpeg.arrayBuffer()), width: canvas.width, height: canvas.height });
      canvas.width = canvas.height = 1;
    } finally { bitmap.close(); }
  }
  return new File([photoPdf(pages)], 'photos-demande-devis.pdf', { type: 'application/pdf' });
}
