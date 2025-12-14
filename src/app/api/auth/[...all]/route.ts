import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const authHandler = toNextJsHandler(auth);

// Wrap handlers with timeout and error handling
const withTimeout = (handler: any, timeoutMs = 20000) => {
  return async (request: NextRequest) => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
      );

      const result = await Promise.race([
        handler(request),
        timeoutPromise,
      ]);

      return result;
    } catch (error) {
      console.error("Auth handler error:", error);
      return NextResponse.json(
        { error: "Authentication service error" },
        { status: 500 }
      );
    }
  };
};

export const GET = withTimeout(authHandler.GET, 20000);
export const POST = withTimeout(authHandler.POST, 20000);