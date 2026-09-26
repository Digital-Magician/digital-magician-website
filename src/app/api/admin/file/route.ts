import { NextResponse } from "next/server";
import { requireRole } from "@/lib/server/auth";
import { contentTypeFor, readPrivateFile } from "@/lib/server/uploads";
import { query } from "@/lib/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Streams an Aadhaar card or payment screenshot to a signed-in admin.
 * The blob itself is private, so this route is the only way to read one,
 * and every view is recorded in the audit log.
 */
export async function GET(request: Request) {
  const admin = await requireRole("admin");
  if (!admin) return NextResponse.json({ error: "Not authorised." }, { status: 403 });

  const path = new URL(request.url).searchParams.get("path") ?? "";
  if (!path.startsWith("private/")) {
    return NextResponse.json({ error: "Unknown file." }, { status: 400 });
  }

  let file: Buffer | null = null;
  try {
    file = await readPrivateFile(path);
  } catch (error) {
    console.error("private file read failed", error);
    return NextResponse.json({ error: "Could not open the file." }, { status: 500 });
  }
  if (!file) return NextResponse.json({ error: "File not found." }, { status: 404 });

  await query`
    INSERT INTO audit_log (actor_user_id, action, entity, entity_id)
    VALUES (${admin.id}, 'file.viewed', 'blob', ${path})
  `;

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": contentTypeFor(path),
      "Cache-Control": "private, no-store",
      "Content-Disposition": "inline",
    },
  });
}
