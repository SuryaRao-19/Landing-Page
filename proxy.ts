import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthorized, ADMIN_REALM } from '@/lib/admin-auth'

// Next 16 renamed `middleware` → `proxy` (runs on the Node.js runtime).
// This gates the /admin area behind HTTP Basic Auth: unauthenticated requests
// are challenged with a 401 before the submissions page ever renders. The page
// re-checks auth itself as defense in depth (see app/admin/submissions/page.tsx).
export function proxy(request: NextRequest) {
  if (!isAdminAuthorized(request.headers.get('authorization'))) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
        // Never let a browser/CDN cache the challenge or a protected response.
        'Cache-Control': 'no-store',
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
