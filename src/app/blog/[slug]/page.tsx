import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight, User } from "lucide-react";
import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import {
  getPostBySlug,
  getAllSlugs,
  getRelatedPosts,
  CATEGORY_COLORS,
} from "@/lib/blog";

// ── Static params ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://digitalmagician.in/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

// ── MDX custom components ──────────────────────────────────────────────────
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4 leading-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-white mt-8 mb-3 leading-snug" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold text-slate-200 mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-relaxed mb-5 text-base" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-slate-300" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc marker:text-amber-500 space-y-2 mb-5 pl-5 text-slate-300" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal marker:text-amber-500 space-y-2 mb-5 pl-5 text-slate-300" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-slate-300 leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-amber-500 bg-amber-500/5 pl-5 pr-4 py-3 rounded-r-xl my-6 text-slate-300 italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-white/10 text-amber-300 font-mono text-sm px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-slate-900 border border-white/10 rounded-xl p-5 overflow-x-auto text-sm font-mono text-slate-300 my-6 leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="border-white/10 my-10" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
      <table className="w-full text-sm text-slate-300" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-white/5 text-white font-semibold" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-white/5" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-white/5 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-slate-400" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" {...props} />
  ),
};

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Compile MDX using @mdx-js/mdx + this project's own React JSX runtime.
  // This avoids the "multiple React copies" error from next-mdx-remote's
  // bundled jsx-runtime.cjs.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { default: MDXContent } = await evaluate(post.content, {
    ...(jsxRuntime as any),
  });

  const related = getRelatedPosts(slug, post.category, 3);
  const catColor =
    CATEGORY_COLORS[post.category] ??
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Digital Magician",
      url: "https://digitalmagician.in",
    },
    url: `https://digitalmagician.in/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalmagician.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalmagician.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://digitalmagician.in/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* ── Back link ─────────────────────────────────────────────── */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All articles
          </Link>

          {/* ── Article header ────────────────────────────────────────── */}
          <header className="mb-10">
            {/* Category */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${catColor}`}
              >
                {post.category}
              </span>
              {post.featured && (
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Featured
                </span>
              )}
            </div>

            {/* Emoji + Title */}
            <div className="flex items-start gap-5 mb-5">
              <span className="text-6xl shrink-0 leading-none">{post.coverEmoji}</span>
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-6 border-b border-white/10">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.formattedDate}
              </span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* ── MDX Content ───────────────────────────────────────────── */}
          <article className="prose-custom">
            <MDXContent components={mdxComponents} />
          </article>

          {/* ── Tags ──────────────────────────────────────────────────── */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Author card ───────────────────────────────────────────── */}
          <div className="mt-12 bento p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl font-bold text-amber-400 border border-amber-500/20">
              G
            </div>
            <div>
              <p className="font-bold text-white text-lg">{post.author}</p>
              <p className="text-amber-400 text-sm mb-3">{post.authorRole}</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gaurav has 7+ years in digital marketing, manages ₹1 Crore+ in annual
                ad spend across Google, Meta, and YouTube, and has placed 500+ students
                in digital marketing roles across Haryana and Delhi NCR.
              </p>
            </div>
          </div>

          {/* ── Inline CTA ────────────────────────────────────────────── */}
          <div className="mt-12 bento gradient-border rounded-2xl p-8 text-center">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
              Want to apply this in the real world?
            </p>
            <h2 className="font-bold text-xl md:text-2xl text-white mb-3">
              Learn by managing live client campaigns
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Digital Magician trains you on real client accounts — not
              simulations. Every concept in this article is hands-on from Week 1.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/917988227240"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Talk to Digital Magician
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/free-demo"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Watch Free Demo
              </Link>
            </div>
          </div>
        </div>

        {/* ── Related Posts ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-2xl text-white">More in {post.category}</h2>
              <Link
                href="/blog"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                All articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relCatColor =
                  CATEGORY_COLORS[rel.category] ??
                  "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
                return (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bento flex flex-col gap-4 p-6 hover:border-amber-500/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-3xl leading-none">{rel.coverEmoji}</span>
                      <span
                        className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${relCatColor}`}
                      >
                        {rel.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base leading-snug text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto pt-3 border-t border-white/5">
                      <Clock className="w-3 h-3" />
                      {rel.readTime}
                      <span>·</span>
                      {rel.formattedDate}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
