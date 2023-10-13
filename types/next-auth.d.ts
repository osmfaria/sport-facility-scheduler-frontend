import NextAuth, { DefaultSession, Session } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      is_owner: boolean
      accessToken: string
    } & DefaultSession['user']
  }
}

