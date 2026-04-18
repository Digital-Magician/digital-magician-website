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
      authorRole: data.authorRole ?? "Founder, Digital Magician & eSahayak",
      category: (data.category ?? "Digital Marketing") as BlogCategory,
      tags: data.tags ?? [],
      readTime: data.readTime ?? estimateReadTime(content),
      featured: data.featured ?? false,
      coverEmoji: data.coverEmoji ?? "📝",
      content,
    } satisfies BlogPost;
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "2026-01-01",
    formattedDate: formatDate(data.date ?? "2026-01-01"),
    author: data.author ?? "Gaurav Malik",
    authorRole: data.authorRole ?? "Founder, Digital Magician & eSahayak",
    category: (data.category ?? "Digital Marketing") as BlogCategory,
    tags: data.tags ?? [],
    readTime: data.readTime ?? estimateReadTime(content),
    featured: data.featured ?? false,
    coverEmoji: data.coverEmoji ?? "📝",
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
    .map((f) => f.replace(/\.mdx$/, ""));
}
