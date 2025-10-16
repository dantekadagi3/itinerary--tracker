import { Pool } from "pg";


declare global {
  
  var pool: Pool | undefined;
}

// Create a single shared pool instance
const pool =
  global.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false } // for platforms like Render, Vercel, etc.
        : false,
  });

// Prevent multiple pools in dev mode
if (process.env.NODE_ENV !== "production") {
  global.pool = pool;
}

// Export a simple query helper
const db = {
  query: (text: string, params?: unknown[]) => pool.query(text, params),
};

export default db;
