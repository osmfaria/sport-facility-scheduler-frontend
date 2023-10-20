import { Box, CircularProgress } from '@mui/material'
import { sxBox } from './styles'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Loading = () => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true))
      router.events.off('routeChangeComplete', () => setLoading(false))
      router.events.off('routeChangeError', () => setLoading(false))
    }
  }, [])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  return loading ? (
    <Box sx={sxBox}>
      <CircularProgress />
    </Box>
  ) : null
}

export default Loading
