import { NextRequest, NextResponse } from 'next/server'

/* --- Middleware ------------------------------------------------------------------------------ */

// -i- https://nextjs.org/docs/app/api-reference/functions/next-request
export async function middleware(req: NextRequest) {
  // Execute the request handler (and pass the request context header)
  const res = NextResponse.next()

  // Allow CORS for /api routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    res.headers.append('Access-Control-Allow-Origin', '*')
    res.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.headers.append('Access-Control-Allow-Headers', 'Content-Type')
  }

  return res
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
