import { NextRequest, NextResponse } from 'next/server'

const SECRET   = process.env.MASTER_PLAN_SECRET ?? ''
const COOKIE   = 'mp_access'
const MAX_AGE  = 60 * 60 * 24 * 365 // 1 year

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  if (!pathname.startsWith('/master-plan') && !pathname.startsWith('/canvas')) return NextResponse.next()

  const unlock = searchParams.get('unlock')

  // Set cookie when unlock param matches secret
  if (unlock && SECRET && unlock === SECRET) {
    const url = req.nextUrl.clone()
    url.searchParams.delete('unlock')
    const res = NextResponse.redirect(url)
    res.cookies.set(COOKIE, SECRET, { httpOnly: true, maxAge: MAX_AGE, path: '/' })
    return res
  }

  // Allow if cookie is valid
  if (req.cookies.get(COOKIE)?.value === SECRET && SECRET) {
    return NextResponse.next()
  }

  // Otherwise 404
  return NextResponse.rewrite(new URL('/not-found', req.url))
}

export const config = {
  matcher: ['/master-plan/:path*', '/canvas/:path*', '/canvas'],
}
