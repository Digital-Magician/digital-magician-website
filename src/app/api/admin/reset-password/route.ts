import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/server/db";
import { generatePassword, hashPassword, requireRole } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Issues a fresh temporary password and signs the student out everywhere. */
export async function POST(request: Request) {
  const admin = await requireRole("admin");
  if (!admin) return NextResponse.json({ error: "Not authorised." }, { status: 403 });

  const body = (await request.json().catch(() => null)) as { userId?: number } | null;
  if (!body?.userId) return NextResponse.json({ error: "Missing student." }, { status: 400 });

  const password = generatePassword();
  const updated = await queryOne<{ email: string }>`
    UPDATE users SET
      password_hash = ${hashPassword(password)},
      must_change_password = TRUE,
      token_version = token_version + 1
    WHERE id = ${body.userId} AND role = 'student'
    RETURNING email
  `;

  if (!updated) return NextResponse.json({ error: "Student not found." }, { status: 404 });

  await query`
    INSERT INTO audit_log (actor_user_id, action, entity, entity_id)
    VALUES (${admin.id}, 'student.password_reset', 'user', ${String(body.userId)})
  `;

  return NextResponse.json({ ok: true, email: updated.email, password });
}
