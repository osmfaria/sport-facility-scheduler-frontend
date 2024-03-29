import {
  Container,
  Box,
  Avatar,
  Typography,
  LinearProgress,
} from '@mui/material'
import React, { ReactElement, useEffect } from 'react'
import { sxAvatar, sxBox, sxContainer } from '@/styles/register.styles'
import { Stadium } from '@mui/icons-material'
import { useCourt } from 'providers/courts'
import { useRouter } from 'next/router'
import CourtForm from '../../../../components/forms/CourtForm'
import Head from 'next/head'

function EditCourt(): ReactElement {
  const router = useRouter()
  const { courtId } = router.query
  const { isLoadingCourt, getCourt, court } = useCourt()

  useEffect(() => {
    if (courtId) getCourt(courtId as string)
  }, [courtId])

  return (
    <>
      <Head>
        <title>Ninja Sports | Edit Facility</title>
        <meta name='Facility edit' content='Facility edit form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <Stadium fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
            Edit Sport Venue
          </Typography>
          {!isLoadingCourt && court ? (
            <CourtForm court={court} />
          ) : (
            <Box>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default EditCourt
