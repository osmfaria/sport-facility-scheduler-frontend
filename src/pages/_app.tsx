import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import Providers from 'providers'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import Layout from '../components/Layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session} refetchInterval={60 * 60 * 2}>
      <Providers>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </SessionProvider>
  )
}
