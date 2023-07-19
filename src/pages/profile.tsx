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

  // Keys must match the api keys

  return (
    <Container maxWidth='sm' sx={sxContainer}>
      <Box sx={sxBox}>
        <Avatar sx={sxAvatar}>
          <HowToRegIcon fontSize='large' />
        </Avatar>
        <Typography variant='h3' mb={4} color='primary'>
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
  )
}

export default Profile
