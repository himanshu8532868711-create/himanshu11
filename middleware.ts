import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    // If no session, redirect to login
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access if session exists
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth check error:", error);
    // If auth check fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};