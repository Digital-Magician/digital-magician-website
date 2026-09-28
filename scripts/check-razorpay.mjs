#!/usr/bin/env node
/**
 * Confirms the Razorpay keys in .env.local actually work.
 * Creates a Rs 1 order, reads it back, then leaves it unpaid (nothing is charged).
 * Usage: node scripts/check-razorpay.mjs
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const id = process.env.RAZORPAY_KEY_ID;
const secret = process.env.RAZORPAY_KEY_SECRET;
const webhook = process.env.RAZORPAY_WEBHOOK_SECRET;

const problems = [];
if (!id) problems.push("RAZORPAY_KEY_ID is missing");
if (!secret) problems.push("RAZORPAY_KEY_SECRET is missing");
if (id && !/^rzp_(test|live)_/.test(id)) {
  problems.push(`RAZORPAY_KEY_ID looks wrong: it should start with rzp_test_ or rzp_live_`);
}
if (problems.length) {
  console.error("Not ready yet:");
  for (const problem of problems) console.error("  - " + problem);
  process.exit(1);
}

const mode = id.startsWith("rzp_live_") ? "LIVE (real money)" : "TEST (no real money)";
const auth = "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");

const response = await fetch("https://api.razorpay.com/v1/orders", {
  method: "POST",
  headers: { Authorization: auth, "Content-Type": "application/json" },
  body: JSON.stringify({
    amount: 100, // Rs 1, never charged: the order is simply left unpaid
    currency: "INR",
    receipt: "dm-key-check",
    notes: { purpose: "Digital Magician key check" },
  }),
});

const body = await response.json().catch(() => ({}));

if (!response.ok) {
  console.error(`Razorpay rejected the keys (HTTP ${response.status}).`);
  console.error("Reason:", body?.error?.description ?? JSON.stringify(body).slice(0, 300));
  if (response.status === 401) {
    console.error("\nThat status means the key id and secret do not match, or the secret was mistyped.");
  }
  process.exit(1);
}

console.log("Razorpay keys work.");
console.log(`  Mode:     ${mode}`);
console.log(`  Test order: ${body.id} (unpaid, nothing was charged)`);
console.log(`  Webhook secret: ${webhook ? "set" : "NOT SET — payments will still work, but late confirmations will not"}`);
