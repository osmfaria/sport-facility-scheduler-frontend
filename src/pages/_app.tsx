import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@/styles/theme'
import Providers from 'providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ThemeProvider>
  )
}
