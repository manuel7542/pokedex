import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
    }
    return NextResponse.next();
  },
)


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/']
};