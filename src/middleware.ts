import { NextResponse, type NextRequest } from "next/server";

/**
 * Private areas carry an X-Robots-Tag as well as page-level metadata, so a
 * shared enrollment link cannot end up in a search index.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/enroll/:path*", "/portal/:path*", "/admin/:path*"],
};
