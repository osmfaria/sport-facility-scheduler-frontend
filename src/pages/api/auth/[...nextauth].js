import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const loginUser = async (credentials) => {
  const user = await axios
    .post('https://court-scheduler.herokuapp.com/api/login/', credentials)
    .then((res) => res.data)
    .catch((err) => console.log('auth error:', err))

  return user
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Django Backend',

      async authorize(credentials) {
        const user = await loginUser(credentials)
        if (user) {
          return { token: user.token }
        }
        throw new Error('Invalid email or password')
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign',
  },
  session: {
    maxAge: 60 * 60 * 72,
  },
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.accessToken = user.token
      }
      return session
    },
  },
})
