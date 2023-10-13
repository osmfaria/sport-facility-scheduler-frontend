import { Session } from 'next-auth'

export interface CredentialsProps {
  username: string
  password: string
}

export interface User {
  token: string
}

export interface CustomSession extends Session {
  accessToken?: string
}