import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken } from "@/lib/auth/verifyToken";
import { refreshSession } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const isValid = await verifyAuthToken(token?.value);
  if (!isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  await refreshSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
