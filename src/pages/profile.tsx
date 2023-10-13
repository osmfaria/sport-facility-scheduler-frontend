import {
  Container,
  Box,
  Avatar,
  Typography,
  LinearProgress,
} from '@mui/material'
import React, { ReactElement, useEffect } from 'react'
import { useUser } from 'providers/user'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { sxAvatar, sxBox, sxContainer } from '@/styles/register.styles'
import { useSession } from 'next-auth/react'
import UserForm from '../components/forms/UserForm'
import Head from 'next/head'

function Profile(): ReactElement {
  const { getUser, isLoading, userData } = useUser()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const userId = session.user.id
      const token = session.user.accessToken
      getUser(userId, token)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Ninja Sports | Profile</title>
        <meta name='Login page' content='login form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <HowToRegIcon fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
            Profile
          </Typography>
          {!isLoading && userData ? (
            <UserForm />
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

export default Profile
