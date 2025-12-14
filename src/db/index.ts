
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

let dbInstance: ReturnType<typeof drizzle> | null = null;

function createDbInstance() {
  const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
    fetch: (url, options) => {
      // Add timeout to fetch requests - increased to 15 seconds for remote database
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      return fetch(url as string, {
        ...options,
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));
    },
  });

  return drizzle(client, { schema });
}

// Singleton pattern for database instance
export const db = (() => {
  if (!dbInstance) {
    dbInstance = createDbInstance();
  }
  return dbInstance;
})();

export type Database = typeof db;
