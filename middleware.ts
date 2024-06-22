import { NextResponse } from "next/server";
import { isTeacher } from "./lib/teacher";
import {
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
} from "@clerk/nextjs/server";

export default clerkMiddleware(
  (auth, req) => {
    const { sessionClaims } = auth();
    const role = sessionClaims?.metadata?.role;

    if (isProtectedRoute(req)) {
      auth().protect();

      if (role) {
        console.log("User is ", role);
        if (role === "student" || role === null) {
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
  "/student(.*)", //kapag wala pang subroutes don't put (.*)
]);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: [
    "/api/webhook",
    "/sign-in(.*)",
    "/teacher-sign-up(.*)",
    "/sign-up(.*)",
    "/teacher-sign-in(.*)",
    "/landing(.*)",
    "/about",
    "/unauthorized",
  ],
};
