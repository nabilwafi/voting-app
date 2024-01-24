// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/participant/:path*', '/vote/:path*'] }
