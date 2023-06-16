import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  const apiKey = process.env.NEXT_PUBLIC_EMBEDDED_MAPS_KEY
  const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`

  return (
    <Html lang='en'>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src={src} strategy='beforeInteractive' async defer/>
      </body>
    </Html>
  )
}
