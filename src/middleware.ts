import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const path = request?.nextUrl?.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const token = request?.cookies?.get("token")?.value;
  const refreshToken = request?.cookies?.get("refreshToken")?.value;

  if (isProtectedRoute) {
    if (!token && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    } else if (!token && refreshToken) {
      const response: any = await fetch(new URL("/api/refresh", request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!data?.success) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      } else {
        return NextResponse.next();
      }
    } else if (token) {
      const response: any = await fetch(new URL("/api/verify-token", request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!data?.success) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      } else {
        return NextResponse.next();
      }
    }
  }

  if (isAuthRoute) {
    if (token || refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    ...protectedRoutes,
    ...authRoutes,
  ]
};
