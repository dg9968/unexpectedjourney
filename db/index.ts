import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  var __registrationsPgPool: Pool | undefined;
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in your environment (Render dashboard in production, a local .env file in development) before using the database."
    );
  }

  if (!globalThis.__registrationsPgPool) {
    globalThis.__registrationsPgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  return globalThis.__registrationsPgPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
