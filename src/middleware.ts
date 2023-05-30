import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPaths = [/^\/dashboard\/.*/, /^\/courts\/.*/]
  const isPathProtected = protectedPaths?.some((path) => path.test(pathname))
  const res = NextResponse.next()
  if (isPathProtected) {
    const token = await getToken({ req })
    if (!token) {
      const url = new URL(`/login`, req.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return res
}
