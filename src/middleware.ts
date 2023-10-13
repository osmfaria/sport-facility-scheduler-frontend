import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPaths = [/^\/courts\/.*/, /^\/facilities\/.*/]
  const ownerProtectedPaths = [/dashboard/i]

  const isPathProtected = protectedPaths?.some((path) => path.test(pathname))
  const isPathOwnerProtected = ownerProtectedPaths?.some((path) =>
    path.test(pathname)
  )

  const res = NextResponse.next()
  const loginUrl = new URL(`/login`, req.url)
  const homeUrl = new URL('/', req.url)

  loginUrl.searchParams.set('callbackUrl', pathname)

  if (isPathProtected || isPathOwnerProtected) {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.redirect(loginUrl)
    }

    if (isPathOwnerProtected && !token.is_owner) {
      return NextResponse.redirect(homeUrl)
    }
  }

  return res
}
