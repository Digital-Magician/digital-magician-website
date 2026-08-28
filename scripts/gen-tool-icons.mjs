// Regenerates src/lib/data/toolIcons.ts from the simple-icons package.
//
//   npm i -D simple-icons
//   node scripts/gen-tool-icons.mjs
//   npm un simple-icons        (optional: the generated file is standalone)
//
// Add a tool by mapping its exact homepage label to a simple-icons export name.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const si = createRequire(import.meta.url)("simple-icons");

const map = {
  // Homepage marquee labels
  "Claude": "siClaude", "Gemini": "siGooglegemini", "Google Ads": "siGoogleads",
  "Meta Ads Manager": "siMeta", "SEMrush": "siSemrush", "Google Analytics 4": "siGoogleanalytics",
  "WordPress": "siWordpress", "GTM": "siGoogletagmanager", "Meta Pixel": "siMeta",
  "Mailchimp": "siMailchimp", "WhatsApp CRM": "siWhatsapp", "YouTube Ads": "siYoutube",
  "HubSpot": "siHubspot", "Google Search Console": "siGooglesearchconsole",
  "n8n": "siN8n", "Zapier": "siZapier", "Looker Studio": "siLooker",
  // Additional labels used on programme and service-course pages
  "Google Tag Manager": "siGoogletagmanager", "Meta Business Suite": "siMeta",
  "Meta Pixel Helper": "siMeta", "Events Manager": "siMeta",
  "WhatsApp Business API": "siWhatsapp", "YouTube Studio": "siYoutubestudio",
  "Elementor": "siElementor", "Figma (basics)": "siFigma", "Framer AI": "siFramer",
  "PageSpeed Insights": "siPagespeedinsights", "WooCommerce": "siWoocommerce",
  "cPanel / Hostinger": "siCpanel",
  "Google Keyword Planner": "siGoogleads", "Keyword Planner": "siGoogleads",
  "Google Merchant Center": "siGoogleads",
};

const entries = Object.entries(map).map(([label, key]) => {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no export "${key}" for "${label}"`);
  return `  ${JSON.stringify(label)}: ${JSON.stringify(icon.path)},`;
}).join("\n");

writeFileSync("src/lib/data/toolIcons.ts", `// Brand icon paths for the homepage tools marquee.
//
// Generated from the \`simple-icons\` package (CC0 collection) so the SVG data is
// accurate rather than hand-drawn, and inlined here so the page makes no external
// requests and ships no icon library to the browser.
//
// To regenerate: npm i -D simple-icons, then re-run scripts/gen-tool-icons.mjs.
//
// Tools without an entry render the existing amber dot. OpenAI, Canva and Ahrefs
// have no icon in the package (removed upstream), so they use the dot.
//
// Marks are the trademarks of their respective owners, used here only to identify
// the tools taught on the course.

export const TOOL_ICON_PATHS: Record<string, string> = {
${entries}
};
`);
console.log(`wrote ${Object.keys(map).length} icons`);
