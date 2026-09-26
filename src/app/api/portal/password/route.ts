import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/server/db";
import { currentUser, hashPassword, setSessionCookie, verifyPassword } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: string;
    newPassword?: string;
  } | null;

  const currentPassword = body?.currentPassword ?? "";
  const newPassword = body?.newPassword ?? "";

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Use at least 8 characters." }, { status: 400 });
  }
  if (newPassword === currentPassword) {
    return NextResponse.json({ error: "Choose a password you have not used here before." }, { status: 400 });
  }

  const row = await queryOne<{ password_hash: string }>`
    SELECT password_hash FROM users WHERE id = ${user.id}
  `;
  if (!row || !verifyPassword(currentPassword, row.password_hash)) {
    return NextResponse.json({ error: "Your current password is incorrect." }, { status: 400 });
  }

  // Bumping token_version signs out every other device.
  const updated = await queryOne<{ token_version: number }>`
    UPDATE users SET
      password_hash = ${hashPassword(newPassword)},
      must_change_password = FALSE,
      token_version = token_version + 1
    WHERE id = ${user.id}
    RETURNING token_version
  `;

  await setSessionCookie({
    id: user.id,
    role: user.role,
    token_version: updated?.token_version ?? user.token_version + 1,
  });

  await query`
    INSERT INTO audit_log (actor_user_id, action, entity, entity_id)
    VALUES (${user.id}, 'password.changed', 'user', ${String(user.id)})
  `;

  return NextResponse.json({ ok: true });
}
