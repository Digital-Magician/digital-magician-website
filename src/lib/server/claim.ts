import "server-only";
import crypto from "node:crypto";

/**
 * Short-lived proof of ownership for an enrollment the visitor just created.
 * The form is not behind a login, so payment confirmation and screenshot
 * upload must prove they belong to that submission rather than any other.
 */
function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return value;
}

export function issueClaimToken(enrollmentId: number, reference: string): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`enrollment:${enrollmentId}:${reference}`)
    .digest("base64url");
}

export function verifyClaimToken(
  enrollmentId: number,
  reference: string,
  token: string | undefined
): boolean {
  if (!token) return false;
  const expected = issueClaimToken(enrollmentId, reference);
  if (expected.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}
