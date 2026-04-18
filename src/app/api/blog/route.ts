import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

// Returns all posts without the full MDX content (for the listing page)
export async function GET() {
  const posts = getAllPosts().map(({ content: _content, ...rest }) => rest);
  return NextResponse.json(posts);
}
