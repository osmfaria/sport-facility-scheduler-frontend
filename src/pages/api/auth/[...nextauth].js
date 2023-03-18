import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const loginUser = async (credentials) => {
  const user = await axios
    .post('https://court-scheduler.herokuapp.com/api/login/', credentials)
    .then((res) => res.data)
    .catch((err) => console.log(err))

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
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 60,
  },
  callbacks: {
    async session(session, user) {
      if (user) {
        session.accessToken = user.token
      }

      return session
    },
  },
})
