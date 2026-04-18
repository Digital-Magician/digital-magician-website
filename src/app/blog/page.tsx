import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Digital Marketing Guides | Digital Magician",
  description:
    "Practitioner-written guides on Google Ads, SEO, Meta Ads, AI tools, and digital marketing careers — from the agency managing ₹1 Crore+ in annual ad spend.",
  openGraph: {
    title: "Blog — Digital Marketing Guides | Digital Magician",
    description:
      "Learn Google Ads, SEO, Meta Ads, and AI tools from practitioners who run live campaigns daily.",
    url: "https://digitalmagician.in/blog",
  },
};

export default function BlogPage() {
  // Strip content field — listing page doesn't need full MDX
  const posts = getAllPosts().map(({ content: _content, ...rest }) => rest);

  return <BlogClient posts={posts} />;
}
