// One-time: uploads the 9 testimonial videos to Vercel Blob and writes the
// resulting public URLs to scripts/blob-urls.json.
//
// Run:  node --env-file=.env.local scripts/upload-testimonials-blob.mjs
// (needs BLOB_READ_WRITE_TOKEN in .env.local — from your Vercel Blob store)
import { put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("✗ Missing BLOB_READ_WRITE_TOKEN. Put it in .env.local first.");
  process.exit(1);
}

const urls = [];
for (let n = 1; n <= 9; n++) {
  const file = `public/testimonials/testimonial-${n}.mp4`;
  const data = await readFile(file);
  const blob = await put(`testimonials/testimonial-${n}.mp4`, data, {
    access: "public",
    contentType: "video/mp4",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  console.log(`  ${n}/9  ${(data.length / 1e6).toFixed(1)}MB  ->  ${blob.url}`);
  urls.push(blob.url);
}

await writeFile("scripts/blob-urls.json", JSON.stringify(urls, null, 2) + "\n");
console.log(`\n✓ Uploaded ${urls.length} videos. Wrote scripts/blob-urls.json`);
