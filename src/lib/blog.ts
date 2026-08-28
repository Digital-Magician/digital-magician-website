import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogCategory } from "./blog-constants";
export type { BlogCategory } from "./blog-constants";
export { BLOG_CATEGORIES, CATEGORY_COLORS } from "./blog-constants";

// ── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  author: string;
  authorRole: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  featured: boolean;
  coverEmoji: string; // emoji used as hero visual
  coverImage?: string | null; // optional real cover image (overrides generated banner)
  faqs?: { q: string; a: string }[] | null; // optional FAQ block → renders + FAQPage schema
  content: string;   // raw MDX string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * A post is live once its date has arrived (compared in IST, which is the
 * audience's timezone). Future-dated posts are scheduled: they sit in the repo
 * but stay invisible until the day they are due.
 */
export function isPublished(dateStr: string): boolean {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  today.setHours(0, 0, 0, 0);
  return new Date(`${dateStr}T00:00:00`) <= today;
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// ── Public API ───────────────────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      date: data.date ?? "2026-01-01",
      formattedDate: formatDate(data.date ?? "2026-01-01"),
      author: data.author ?? "Gaurav Malik",
      authorRole: data.authorRole ?? "Founder, Digital Magician",
      category: (data.category ?? "Digital Marketing") as BlogCategory,
      tags: data.tags ?? [],
      readTime: data.readTime ?? estimateReadTime(content),
      featured: data.featured ?? false,
      coverEmoji: data.coverEmoji ?? "📝",
      coverImage: data.coverImage ?? null,
      faqs: data.faqs ?? null,
      content,
    } satisfies BlogPost;
  });

  // Hide scheduled posts, then sort by date descending
  return posts
    .filter((p) => isPublished(p.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Not live yet: behave as if it does not exist.
  if (!isPublished(data.date ?? "2026-01-01")) return null;

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "2026-01-01",
    formattedDate: formatDate(data.date ?? "2026-01-01"),
    author: data.author ?? "Gaurav Malik",
    authorRole: data.authorRole ?? "Founder, Digital Magician",
    category: (data.category ?? "Digital Marketing") as BlogCategory,
    tags: data.tags ?? [],
    readTime: data.readTime ?? estimateReadTime(content),
    featured: data.featured ?? false,
    coverEmoji: data.coverEmoji ?? "📝",
    coverImage: data.coverImage ?? null,
    faqs: data.faqs ?? null,
    content,
  };
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => {
      const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8"));
      return isPublished(data.date ?? "2026-01-01");
    })
    .map((f) => f.replace(/\.mdx$/, ""));
}
