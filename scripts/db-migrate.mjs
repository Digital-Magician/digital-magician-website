#!/usr/bin/env node
/**
 * Applies db/schema.sql to the database in DATABASE_URL.
 * Usage: node scripts/db-migrate.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { getClient } from "./db-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const { sql, run, close } = await getClient();
const schema = readFileSync(join(here, "..", "db", "schema.sql"), "utf8");

// Split on semicolons that end a statement line; the schema has no functions or
// dollar-quoted bodies, so this is sufficient and keeps the script dependency-free.
// Comment lines are stripped from each chunk rather than used to skip it: a
// statement that happens to follow a comment still has to run.
const statements = schema
  .split(/;\s*$/m)
  .map((chunk) =>
    chunk
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n")
      .trim()
  )
  .filter(Boolean);

let applied = 0;
for (const statement of statements) {
  try {
    await run(statement);
    applied++;
  } catch (error) {
    console.error("\nFailed statement:\n" + statement.slice(0, 200));
    console.error(error.message);
    process.exit(1);
  }
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM information_schema.tables WHERE table_schema = 'public'`;
console.log(`Applied ${applied} statements. Public tables now: ${count}.`);
await close();
