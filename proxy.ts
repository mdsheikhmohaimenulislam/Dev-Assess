import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Login/Register routes
const AUTH_ROUTES = ["/login", "/register"];

// Role অনুযায়ী dashboard
const ROLE_ROUTES: Record<UserRole, string> = {
  ADMIN: "/admin/dashboard",
  COMPANY: "/company/dashboard",
  CANDIDATE: "/candidate/dashboard",
};

// Role অনুযায়ী protected route
const ROLE_ROUTE_PREFIXES: Record<UserRole, string> = {
  ADMIN: "/admin",
  COMPANY: "/company",
  CANDIDATE: "/candidate",
};

function getUserFromToken(
  accessToken: string | undefined,
): JwtPayload | null {
  // Token নেই
  if (!accessToken) {
    return null;
  }

  try {
    const user = jwtDecode<JwtPayload>(accessToken);

    // Token expired কিনা check
    if (user.exp && user.exp * 1000 < Date.now()) {
      return null;
    }

    // Valid role কিনা check
    if (
      user.role !== "ADMIN" &&
      user.role !== "COMPANY" &&
      user.role !== "CANDIDATE"
    ) {
      return null;
    }

    return user;
  } catch {
    // Invalid token
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie থেকে access token নেওয়া
  const accessToken = request.cookies.get("accessToken")?.value;

  // Token থেকে user বের করা
  const user = getUserFromToken(accessToken);

  // ============================================
  // Google OAuth success
  // ============================================

  if (pathname.startsWith("/auth/success")) {
    return NextResponse.next();
  }

  // ============================================
  // Login / Register
  // Already logged in হলে dashboard-এ পাঠাবে
  // ============================================

  if (AUTH_ROUTES.includes(pathname) && user) {
    return NextResponse.redirect(
      new URL(ROLE_ROUTES[user.role], request.url),
    );
  }

  // ============================================
  // ADMIN ROUTES
  // /admin/*
  // ============================================

  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.ADMIN)) {
    // Login করা নেই
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }

    // Login করা আছে কিন্তু ADMIN না
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL(ROLE_ROUTES[user.role], request.url),
      );
    }

    // ADMIN allowed
    return NextResponse.next();
  }

  // ============================================
  // COMPANY ROUTES
  // /company/*
  // ============================================

  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.COMPANY)) {
    // Login করা নেই
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }

    // Login করা আছে কিন্তু COMPANY না
    if (user.role !== "COMPANY") {
      return NextResponse.redirect(
        new URL(ROLE_ROUTES[user.role], request.url),
      );
    }

    // COMPANY allowed
    return NextResponse.next();
  }

  // ============================================
  // CANDIDATE ROUTES
  // /candidate/*
  // ============================================

  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.CANDIDATE)) {
    // Login করা নেই
    if (!user) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }

    // Login করা আছে কিন্তু CANDIDATE না
    if (user.role !== "CANDIDATE") {
      return NextResponse.redirect(
        new URL(ROLE_ROUTES[user.role], request.url),
      );
    }

    // CANDIDATE allowed
    return NextResponse.next();
  }

  // ============================================
  // Everything else
  // ============================================

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Authentication
       "/login",
    "/register",

    // Google OAuth
    "/auth/success",

    // Admin
    "/admin/:path*",

    // Company
    "/company/:path*",

    // Candidate
    "/candidate/:path*",
  ],
};