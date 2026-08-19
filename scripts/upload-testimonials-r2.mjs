// One-time: uploads the 9 compressed testimonial videos to Cloudflare R2 and
// writes the resulting public URLs to scripts/r2-urls.json.
//
// Run:  node --env-file=.env.local scripts/upload-testimonials-r2.mjs
// Needs in .env.local: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT,
// R2_PUBLIC_URL (the pub-xxxx.r2.dev base), and optionally R2_BUCKET
// (defaults to "testimonials").
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile, writeFile } from "node:fs/promises";

const {
  R2_ACCESS_KEY_ID: keyId,
  R2_SECRET_ACCESS_KEY: secret,
  R2_ENDPOINT: endpoint,
  R2_PUBLIC_URL: publicUrl,
  R2_BUCKET: bucket = "testimonials",
  VIDEO_DIR: videoDir,
} = process.env;

if (!keyId || !secret || !endpoint || !publicUrl) {
  console.error("✗ Missing R2_* vars. Put R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_PUBLIC_URL in .env.local first.");
  process.exit(1);
}
if (!videoDir) {
  console.error("✗ Set VIDEO_DIR to the folder containing testimonial-N.mp4 files.");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint,
  credentials: { accessKeyId: keyId, secretAccessKey: secret },
});

const base = publicUrl.replace(/\/$/, "");
const urls = [];
for (let n = 1; n <= 9; n++) {
  const key = `testimonial-${n}.mp4`;
  const data = await readFile(`${videoDir}/${key}`);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: data,
    ContentType: "video/mp4",
    CacheControl: "public, max-age=31536000, immutable",
  }));
  const url = `${base}/${key}`;
  console.log(`  ${n}/9  ${(data.length / 1e6).toFixed(1)}MB  ->  ${url}`);
  urls.push(url);
}

await writeFile("scripts/r2-urls.json", JSON.stringify(urls, null, 2) + "\n");
console.log(`\n✓ Uploaded ${urls.length} videos to R2. Wrote scripts/r2-urls.json`);
