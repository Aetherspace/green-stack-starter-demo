import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Allow CORS for /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', '*')
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type')
  }

  return response
}
