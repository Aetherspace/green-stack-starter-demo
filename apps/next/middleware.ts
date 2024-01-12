import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareHeaderContext } from 'aetherspace/utils/serverUtils'

/* --- Middleware ------------------------------------------------------------------------------ */

// -i- https://nextjs.org/docs/app/api-reference/functions/next-request
export async function middleware(req: NextRequest) {
  // Create the request context header (to pass things like auth, user, etc. to the API)
  const headerContext = {} // TODO: add any JSON serializable data you'd like to pass to the APIs here
  const extraHeaders = {
    // 'x-custom-header': 'custom-value',
  }

  // Execute the request handler (and pass the request context header)
  const res = NextResponse.next({
    request: {
      headers: await createMiddlewareHeaderContext(req, headerContext, extraHeaders),
    },
  })

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
