import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = await getKindeServerSession();

  // Check if the user is not authenticated
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url));
  }

  return NextResponse.next(); // Allow access if authenticated
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:id', '/teams', '/teams/create', '/workspace', '/workspace/:fileId'],
};
