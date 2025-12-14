import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
 
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	plugins: [bearer()],
	// Add session configuration for better timeout handling
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // update age every day
		absoluteTimeout: 60 * 60 * 24 * 30, // 30 days absolute
	}
});

// Session validation helper with timeout
export async function getCurrentUser(request: NextRequest) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const session = await Promise.race([
      auth.api.getSession({ headers: await headers() }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Session fetch timeout")), 5000)
      ),
    ]);

    clearTimeout(timeoutId);
    return (session as any)?.user || null;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}