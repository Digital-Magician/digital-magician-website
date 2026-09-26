import { NextResponse } from "next/server";
import { queryOne, isDbConfigured } from "@/lib/server/db";
import { setSessionCookie, touchLogin, verifyPassword, type Role } from "@/lib/server/auth";
import { rateLimit, clearRateLimit, clientIp } from "@/lib/server/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  role: Role;
  is_active: boolean;
  must_change_password: boolean;
  token_version: number;
}

export async function POST(request: Request) {
  if (!isDbConfigured() || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
    expect?: Role;
  } | null;

  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  const ip = clientIp(request.headers);
  const byIp = await rateLimit(`login:ip:${ip}`, 15, 15 * 60);
  const byEmail = await rateLimit(`login:email:${email}`, 8, 15 * 60);
  if (!byIp.allowed || !byEmail.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Wait 15 minutes, or ask the team to reset your password." },
      { status: 429 }
    );
  }

  const user = await queryOne<UserRow>`
    SELECT id, email, password_hash, role, is_active, must_change_password, token_version
    FROM users WHERE email = ${email}
  `;

  // One message for every failure, so the form cannot be used to discover emails.
  const failure = NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  if (!user || !user.is_active) return failure;
  if (!verifyPassword(password, user.password_hash)) return failure;
  if (body?.expect === "admin" && user.role !== "admin") return failure;

  await setSessionCookie(user);
  await touchLogin(user.id);
  await clearRateLimit(`login:email:${email}`);

  return NextResponse.json({
    ok: true,
    role: user.role,
    mustChangePassword: user.must_change_password,
  });
}
