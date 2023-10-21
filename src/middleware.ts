import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPathname = [
    /booking/i,
    /profile/i,
    /^\/courts\/.*/,
    /^\/facilities\/.*/,
  ]
  const ownerPathname = /dashboard/i
  const loginPathname = [/login/i, /register/i]

  const isProtected = protectedPathname?.some((path) => path.test(pathname))
  const isOwnerProtected = ownerPathname.test(pathname)
  const isLogin = loginPathname.some((path) => path.test(pathname))

  const res = NextResponse.next()
  const loginUrl = new URL(`/login`, req.url)
  const homeUrl = new URL('/', req.url)

  const token = await getToken({ req })
  loginUrl.searchParams.set('callbackUrl', pathname)

  if (isProtected || isOwnerProtected) {
    if (!token) {
      return NextResponse.redirect(loginUrl)
    }

    if (isOwnerProtected && !token.is_owner) {
      return NextResponse.redirect(homeUrl)
    }
  }

  if (isLogin) {
    if (token) {
      return NextResponse.redirect(homeUrl)
    }
  }

  return res
}
