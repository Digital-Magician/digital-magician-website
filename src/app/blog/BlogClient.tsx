"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Search } from "lucide-react";
import type { BlogCategory } from "@/lib/blog-constants";
import { BLOG_CATEGORIES, CATEGORY_COLORS } from "@/lib/blog-constants";

// Strip content from posts for the listing view
type PostPreview = {
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
  coverEmoji: string;
};

// ── PostCard ──────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: PostPreview }) {
  const catColor =
    CATEGORY_COLORS[post.category] ??
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bento flex flex-col gap-4 p-6 hover:border-amber-500/40 transition-all duration-300"
    >
      {/* Emoji + category */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl leading-none">{post.coverEmoji}</span>
        <span
          className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}
        >
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-bold text-lg leading-snug text-white group-hover:text-amber-400 transition-colors line-clamp-2">
        {post.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
        {post.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span>·</span>
          <span>{post.formattedDate}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </Link>
  );
}

// ── FeaturedCard ──────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: PostPreview }) {
  const catColor =
    CATEGORY_COLORS[post.category] ??
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group gradient-border p-[1px] rounded-2xl block"
    >
      <div className="bento rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start hover:bg-white/5 transition-colors">
        {/* Emoji */}
        <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-amber-500/10 flex items-center justify-center text-5xl md:text-6xl">
          {post.coverEmoji}
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Featured Post
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-bold text-2xl md:text-3xl leading-snug text-white group-hover:text-amber-400 transition-colors">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed line-clamp-2">
            {post.description}
          </p>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-slate-500">{post.formattedDate}</span>
            <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-amber-400 group-hover:gap-2.5 transition-all">
              Read article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main client component ─────────────────────────────────────────────────────
export default function BlogClient({ posts }: { posts: PostPreview[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter
  const filtered = posts.filter((post) => {
    const catOk = activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const searchOk =
      q === "" ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return catOk && searchOk;
  });

  const featuredPosts = filtered.filter((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured);
  const heroFeatured = featuredPosts[0] ?? null;
  const remainingFeatured = featuredPosts.slice(1);
  const gridPosts = [...remainingFeatured, ...regularPosts];

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="hero-item hero-item-1 inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
            Digital Marketing Knowledge Base
          </span>
          <h1 className="hero-item hero-item-2 font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Learn Digital Marketing
            <span className="block text-amber-400">The Right Way</span>
          </h1>
          <p className="hero-item hero-item-3 text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Practitioner-written guides on Google Ads, SEO, Meta Ads, career strategy,
            and AI tools — from the agency managing ₹1 Crore+ in annual ad spend.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* ── Search + Filter ───────────────────────────────────────────── */}
        <div className="hero-item hero-item-4 flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory("All")}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === "All"
                  ? "bg-amber-500 text-slate-900 border-amber-500"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              All Posts
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-900 border-amber-500"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Post count ───────────────────────────────────────────────── */}
        {filtered.length > 0 && (
          <p className="text-sm text-slate-500 mb-8">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
        )}

        {/* ── Empty state ──────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <span className="text-5xl mb-5 block">🔍</span>
            <p className="text-slate-400 text-lg mb-2">No articles found.</p>
            <p className="text-slate-500 text-sm mb-6">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── Featured hero post ───────────────────────────────────────── */}
        {heroFeatured && (
          <div className="mb-10">
            <FeaturedCard post={heroFeatured} />
          </div>
        )}

        {/* ── Post grid ────────────────────────────────────────────────── */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <div className="mt-20 bento gradient-border rounded-2xl p-8 md:p-12 text-center">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            Ready to go beyond reading?
          </p>
          <h2 className="font-bold text-2xl md:text-3xl mb-4 text-white">
            Apply these skills on real client campaigns
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Everything written here is what we teach — and more importantly, what we{" "}
            <em>do</em> — at Digital Magician. Join the next batch and manage live
            campaigns from Week 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917988227240"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Talk to Gaurav on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/free-demo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Watch Free Demo First
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
