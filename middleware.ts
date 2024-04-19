import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up", "/preparedness-tips", "/help", "/disaster-info", "/learn-more"],
    afterAuth(auth, req, evt){
      if (!auth.userId && !auth.isPublicRoute) {
        const signInUrl = new URL("/sign-in", req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};