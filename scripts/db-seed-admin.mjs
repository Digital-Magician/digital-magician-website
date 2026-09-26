#!/usr/bin/env node
/**
 * Creates or resets an admin account.
 * Usage: node scripts/db-seed-admin.mjs "admin@example.com" "Full Name"
 */
import crypto from "node:crypto";
import { getClient } from "./db-client.mjs";

const [email, name] = process.argv.slice(2);
if (!email) {
  console.error('Usage: node scripts/db-seed-admin.mjs "admin@example.com" "Full Name"');
  process.exit(1);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derived}`;
}

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const password = "DM-" + Array.from(crypto.randomBytes(10), (b) => alphabet[b % alphabet.length]).join("");

const { sql, close } = await getClient();
await sql`
  INSERT INTO users (email, full_name, password_hash, role, must_change_password)
  VALUES (${email.toLowerCase()}, ${name || "Administrator"}, ${hashPassword(password)}, 'admin', TRUE)
  ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = 'admin',
    is_active = TRUE,
    must_change_password = TRUE,
    token_version = users.token_version + 1
`;

console.log(`Admin ready: ${email}`);
console.log(`Temporary password: ${password}`);
console.log("Sign in at /admin/login and change it immediately.");
await close();
