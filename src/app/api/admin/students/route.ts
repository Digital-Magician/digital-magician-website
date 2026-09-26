import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/server/db";
import { generatePassword, hashPassword, requireRole } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Creates a student and returns the one-time password for the team to share. */
export async function POST(request: Request) {
  const admin = await requireRole("admin");
  if (!admin) return NextResponse.json({ error: "Not authorised." }, { status: 403 });

  const body = (await request.json().catch(() => null)) as {
    fullName?: string;
    email?: string;
    phone?: string;
    courseId?: number;
  } | null;

  const fullName = (body?.fullName ?? "").trim();
  const email = (body?.email ?? "").trim().toLowerCase();
  const phone = (body?.phone ?? "").trim();

  if (fullName.length < 3) {
    return NextResponse.json({ error: "Enter the student's full name." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const existing = await queryOne<{ id: number }>`SELECT id FROM users WHERE email = ${email}`;
  if (existing) {
    return NextResponse.json({ error: "A user with that email already exists." }, { status: 409 });
  }

  const password = generatePassword();
  const created = await queryOne<{ id: number }>`
    INSERT INTO users (email, full_name, phone, password_hash, role, must_change_password)
    VALUES (${email}, ${fullName}, ${phone || null}, ${hashPassword(password)}, 'student', TRUE)
    RETURNING id
  `;

  if (created && body?.courseId) {
    await query`
      INSERT INTO course_access (user_id, course_id) VALUES (${created.id}, ${body.courseId})
      ON CONFLICT DO NOTHING
    `;
  }

  await query`
    INSERT INTO audit_log (actor_user_id, action, entity, entity_id, meta)
    VALUES (${admin.id}, 'student.created', 'user', ${String(created?.id)}, ${JSON.stringify({ email })})
  `;

  return NextResponse.json({ ok: true, email, password });
}
