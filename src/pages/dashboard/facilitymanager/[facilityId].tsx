import { Container, Box, Avatar, Typography } from '@mui/material'
import React, { ReactElement, useEffect } from 'react'
import { sxAvatar, sxBox, sxContainer } from '@/styles/register.styles'
import { Stadium } from '@mui/icons-material'
import { useFacility } from 'providers/FacilityProvider'
import { useSession } from 'next-auth/react'
import FacilityForm from '../../../components/FacilityForm'
import { useRouter } from 'next/router'
import Head from 'next/head'

function NewFacility(): ReactElement {
  const router = useRouter()
  const { facilityId } = router.query
  const { getFacility, facility } = useFacility()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const token = session.user.accessToken
      getFacility(facilityId as string, token)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Ninja Sports | Edit Facility</title>
        <meta name='Edit Facility' content='Edit Facility form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <Stadium fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
            Edit Facility
          </Typography>
          {facility && <FacilityForm facility={facility} />}
        </Box>
      </Container>
    </>
  )
}

export default NewFacility
