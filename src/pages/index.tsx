import { Box } from '@mui/material'
import { sxSectionsWrapper } from '../styles/home.styles'
import Banner from '../components/Banner'
import SectionOne from '../components/Sections/SectionOne'
import SectionTwo from '../components/Sections/SectionTwo'
import SectionThree from '../components/Sections/SectionThree'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ninja Sports</title>
        <meta property='og:title' content='Ninja Sports' key='title' />
      </Head>
      <Box mt='-74px'>
        <Banner />

        <Box sx={sxSectionsWrapper}>
          <SectionOne />
          <SectionTwo />
          <SectionThree />
        </Box>
      </Box>
    </>
  )
}
