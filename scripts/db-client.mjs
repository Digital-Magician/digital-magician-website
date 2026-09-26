import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

// Next.js reads .env.local automatically; plain node scripts need to be told.
config({ path: ".env.local" });
config();

/** Returns { sql, run } for either a Neon URL or a local Postgres URL. */
export async function getClient() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Run `npx vercel env pull .env.local` first.");
    process.exit(1);
  }

  if (/@?(localhost|127\.0\.0\.1)(:|\/)/.test(url)) {
    const { default: pg } = await import("pg");
    const pool = new pg.Pool({ connectionString: url });
    const sql = async (strings, ...values) => {
      const text = strings.reduce(
        (acc, part, index) => acc + part + (index < values.length ? `$${index + 1}` : ""),
        ""
      );
      return (await pool.query(text, values)).rows;
    };
    return { sql, run: async (text) => (await pool.query(text)).rows, close: () => pool.end(), url };
  }

  const sql = neon(url);
  return { sql, run: async (text) => sql.query(text), close: async () => {}, url };
}
