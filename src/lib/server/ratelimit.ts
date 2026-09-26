import "server-only";
import { query, queryOne } from "./db";

/**
 * Database-backed limiter. Serverless instances do not share memory, so the
 * counter has to live in Postgres for login and certificate lookups to be
 * protected in practice.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const row = await queryOne<{ hits: number }>`
    INSERT INTO rate_limits (key, hits, window_start)
    VALUES (${key}, 1, now())
    ON CONFLICT (key) DO UPDATE SET
      hits = CASE
        WHEN rate_limits.window_start < now() - make_interval(secs => ${windowSeconds}) THEN 1
        ELSE rate_limits.hits + 1
      END,
      window_start = CASE
        WHEN rate_limits.window_start < now() - make_interval(secs => ${windowSeconds}) THEN now()
        ELSE rate_limits.window_start
      END
    RETURNING hits
  `;
  const hits = row?.hits ?? 1;
  return { allowed: hits <= limit, remaining: Math.max(0, limit - hits) };
}

export async function clearRateLimit(key: string) {
  await query`DELETE FROM rate_limits WHERE key = ${key}`;
}

/** Best-effort client IP for rate-limit keys (never shown to users). */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
