import { neon } from "@neondatabase/serverless";

/**
 * Production talks to Neon over HTTP, which suits serverless functions.
 * A localhost URL is handled by node-postgres instead, so the whole app can be
 * exercised against a local database during development.
 */
type QueryFn = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Record<string, unknown>[]>;

let client: QueryFn | null = null;

export function connectionString(): string | null {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || null;
}

export function isDbConfigured(): boolean {
  return Boolean(connectionString());
}

function isLocal(url: string): boolean {
  return /@?(localhost|127\.0\.0\.1)(:|\/)/.test(url);
}

function localClient(url: string): QueryFn {
  let poolPromise: Promise<import("pg").Pool> | null = null;

  return async (strings, ...values) => {
    if (!poolPromise) {
      poolPromise = import("pg").then(({ default: pg }) => new pg.Pool({ connectionString: url }));
    }
    const pool = await poolPromise;
    const text = strings.reduce(
      (acc, part, index) => acc + part + (index < values.length ? `$${index + 1}` : ""),
      ""
    );
    const result = await pool.query(text, values);
    return result.rows;
  };
}

export function db(): QueryFn {
  if (client) return client;
  const url = connectionString();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Run `npx vercel env pull .env.local` after installing the Neon integration."
    );
  }
  client = isLocal(url) ? localClient(url) : (neon(url) as unknown as QueryFn);
  return client;
}

export async function query<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const rows = await db()(strings, ...values);
  return rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T | null> {
  const rows = await query<T>(strings, ...values);
  return rows[0] ?? null;
}
