import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const loginUser = async (credentials) => {
  const user = await axios
    .post('https://court-scheduler.herokuapp.com/api/login/', credentials)
    .then((res) => res.data)
    .catch((_) => toast.error('ops... something went wrong, try again later'))

  return user
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Django Backend',

      credentials: {
        email: {
          label: 'username',
          type: 'text',
          placeholder: 'odin',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const user = await loginUser(credentials)
        if (user) {
          return { ...user }
        }
        throw new Error('Invalid email or password')
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 60 * 60 * 72,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user,
        }
      }
      return token
    },
    async session({ session, token }) {
      const updatedSession = {
        ...session,
        user: {
          accessToken: token.token,
          username: token.username,
          id: token.id,
          is_owner: token.is_owner,
          email: token.email,
        },
      }
      return updatedSession
    },
  },
})
