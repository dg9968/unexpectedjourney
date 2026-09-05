import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, hashSecret } from "./app/admin-auth";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const adminSecret = process.env.ADMIN_SECRET;
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = adminSecret ? await hashSecret(adminSecret) : null;

  if (!expected || !cookie || cookie !== expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
