import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { query, queryOne } from "./db";

export const SESSION_COOKIE = "dm_session";
const SESSION_DAYS = 30;

export type Role = "student" | "admin";

export interface SessionUser {
  id: number;
  email: string;
  full_name: string;
  role: Role;
  must_change_password: boolean;
  is_active: boolean;
  token_version: number;
}

interface SessionPayload {
  uid: number;
  role: Role;
  v: number; // token version, so a password change logs old devices out
  exp: number;
}

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return value;
}

// ── Passwords ────────────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, expected] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !expected) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expected, "hex");
  if (derived.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derived, expectedBuf);
}

/** Readable temporary password for credentials shared over WhatsApp. */
export function generatePassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(8);
  return "DM-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

// ── Session cookie ───────────────────────────────────────────────────────────

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

export function createSessionToken(user: { id: number; role: Role; token_version: number }): string {
  const payload: SessionPayload = {
    uid: user.id,
    role: user.role,
    v: user.token_version,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  // A missing secret must not crash a page render; it means nobody is signed in.
  let expected: string;
  try {
    expected = sign(body);
  } catch {
    return null;
  }
  if (
    expected.length !== signature.length ||
    !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  ) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(user: { id: number; role: Role; token_version: number }) {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** The signed-in user, re-read from the database on every request. */
export async function currentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const payload = readSessionToken(store.get(SESSION_COOKIE)?.value);
  if (!payload) return null;

  const user = await queryOne<SessionUser>`
    SELECT id, email, full_name, role, must_change_password, is_active, token_version
    FROM users WHERE id = ${payload.uid}
  `;
  if (!user || !user.is_active) return null;
  if (user.token_version !== payload.v) return null; // password changed elsewhere
  if (user.role !== payload.role) return null; // role changed since sign-in
  return user;
}

export async function requireRole(role: Role): Promise<SessionUser | null> {
  const user = await currentUser();
  if (!user) return null;
  if (role === "admin" && user.role !== "admin") return null;
  return user;
}

export async function touchLogin(userId: number) {
  await query`UPDATE users SET last_login_at = now() WHERE id = ${userId}`;
}
