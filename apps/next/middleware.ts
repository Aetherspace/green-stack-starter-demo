import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareHeaderContext } from '@green-stack/utils/apiUtils'

/* --- Middleware ------------------------------------------------------------------------------ */

// -i- https://nextjs.org/docs/app/api-reference/functions/next-request
export async function middleware(req: NextRequest) {
    // Calculate geolocation (vercel only)
    const vercelReqIP = req.headers.get('x-real-ip')
    const vercelReqGeo = req.headers.get('x-vercel-ip-country')
    const vercelReqCity = req.headers.get('x-vercel-ip-city')
    const hasGeo = vercelReqGeo && vercelReqCity
    const geolocation = { ip: vercelReqIP, country: vercelReqGeo, city: vercelReqCity }

    // Create the request context header (to pass things like auth, user, etc. to the API)
    const headerContext = {
        test: "Hello Middleware",
        geolocation: hasGeo ? geolocation : null,
        // TODO: add any JSON serializable data you'd like to pass to the APIs here
        // ...
    }
    
    // Add any headers you'd like to always be present on requests that passed through this middleware
    const extraHeaders = {
        // e.g. 'x-api-key': appConfig.apiKey
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

    // Continue by resolving the request
    return res
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|graphql|trpc)(.*)'],
}
