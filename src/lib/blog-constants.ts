// ── Shared blog constants — safe to import in client components ───────────────
// This file has NO Node.js imports (no fs, no path, no gray-matter).
// blog.ts imports from here; client components import from here too.

export type BlogCategory =
  | "Google Ads"
  | "SEO"
  | "Meta Ads"
  | "Career Advice"
  | "AI Tools"
  | "Digital Marketing";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Digital Marketing",
  "Google Ads",
  "SEO",
  "Meta Ads",
  "Career Advice",
  "AI Tools",
];

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Google Ads":        "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "SEO":               "bg-green-500/10 text-green-400 border-green-500/20",
  "Meta Ads":          "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Career Advice":     "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "AI Tools":          "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Digital Marketing": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};
