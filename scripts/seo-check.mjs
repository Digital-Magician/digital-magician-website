// Reproduces the three checks from the SEO audit against locally rendered HTML:
//   1. title length  <= 60
//   2. meta description length <= 160
//   3. heading levels never skip (h1 -> h3 etc.)
//
// Run against a running production server:
//   BASE=http://localhost:3058 node scripts/seo-check.mjs
const BASE = process.env.BASE || "http://localhost:3058";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ")
   .replace(/&#x2F;/g, "/").replace(/&mdash;/g, "—").replace(/&rsquo;/g, "’");

async function check(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) return { path, error: res.status };
  const html = await res.text();
  const issues = [];

  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = t ? decode(t[1]).trim() : "";
  if (!title) issues.push("MISSING TITLE");
  else if (title.length > 60) issues.push(`title ${title.length}: ${title}`);

  const d = html.match(/<meta name="description" content="([^"]*)"/i);
  const desc = d ? decode(d[1]).trim() : "";
  if (!desc) issues.push("MISSING DESCRIPTION");
  else if (desc.length > 160) issues.push(`desc ${desc.length}`);

  // Heading order: ignore anything inside the Next.js dev/route announcer.
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  let prev = 0;
  for (const lvl of levels) {
    if (prev && lvl > prev + 1) { issues.push(`heading skip h${prev}->h${lvl}`); break; }
    prev = lvl;
  }
  return { path, title, issues };
}

const paths = process.argv.slice(2);
let bad = 0;
for (const p of paths) {
  const r = await check(p);
  if (r.error) { console.log(`  ERR ${r.error} ${p}`); bad++; continue; }
  if (r.issues.length) { bad++; console.log(`  ✗ ${p}\n      ${r.issues.join("\n      ")}`); }
}
console.log(`\nchecked ${paths.length} pages, pages with issues: ${bad}`);
process.exit(bad ? 1 : 0);
