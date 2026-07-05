// import { getAllowedRoles } from "@/utils/route-permission";
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const userRole = req.cookies.get("role")?.value; // tomar auth cookie/token theke role nao

//   const allowedRoles = getAllowedRoles(pathname);

//   // Public route (config e nai) — allow
//   if (!allowedRoles) return NextResponse.next();

//   if (!userRole || !allowedRoles.includes(userRole as any)) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/agent-leader/:path*", "/agent/:path*", "/dashboard/:path*"],
// };



import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  UserRole,
  getDefaultDashboardRoute,
  getRouteOwner,
  isValidRouteForRole,
} from "./utils/auth-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      userRole = decoded.role as UserRole;
    } catch (error) {
      // Invalid or expired token → cookies clear kore login e pathao
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  const routeOwner = getRouteOwner(pathname);

  // 🔹 Public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // 🔹 Protected route but not logged in
  if (!accessToken || !userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔹 Role mismatch → nijer dashboard e redirect
  if (!isValidRouteForRole(pathname, userRole)) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }

  // ✅ Everything OK
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};