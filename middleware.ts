import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(
  (auth, req) => {
    const { sessionClaims } = auth();
    const role = sessionClaims?.metadata?.role;

    if (isProtectedRoute(req)) {
      auth().protect();

      if (role) {
        if (role === "student" || role === null) {
          console.log("User is unauthorized, with role : ", role);
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }
  }
  //{ debug: true }
);

const isProtectedRoute = createRouteMatcher([
  "/",
  "/teacher(.*)", //for admin/teacher or student/customer pages
]);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: [
    "/api/webhook",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/landing(.*)",
    "/about",
    "/unauthorized",
  ],
};
