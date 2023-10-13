import { Box, Stack, Typography } from '@mui/material'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const FloatingNumbers = () => {
  const AnimatedNumbers = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement | null>(null)

    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { duration: 3000 })
    const isInView = useInView(ref)

    useEffect(() => {
      if (isInView) {
        motionValue.set(value)
      }
    }, [isInView, value, motionValue])

    useEffect(() => {
      springValue.on('change', (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0)
        }
      })
    }, [springValue, value])

    return <Box component='span' ref={ref}></Box>
  }

  return (
    <>
      <Typography
        variant='h2'
        fontSize={{ xs: '30px', md: '40px' }}
        textAlign='center'
        m='200px 0 40px'
      >
        📏 App Metrics
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={5}
        mb='200px'
        justifyContent='space-around'
        alignItems='center'
      >
        <Box>
          <Typography variant='h1' textAlign={{ xs: 'center', md: 'start' }}>
            <AnimatedNumbers value={100} />+
          </Typography>
          <Typography
            variant='body1'
            color='primary'
            fontSize='24px'
            textAlign={{ xs: 'center', md: 'start' }}
          >
            Facilities available
          </Typography>
        </Box>
        <Box>
          <Typography variant='h1' textAlign={{ xs: 'center', md: 'start' }}>
            {' '}
            <AnimatedNumbers value={20} />+
          </Typography>
          <Typography
            variant='body1'
            color='primary'
            fontSize='24px'
            textAlign={{ xs: 'center', md: 'start' }}
          >
            Partners
          </Typography>
        </Box>
        <Box>
          <Typography variant='h1' textAlign={{ xs: 'center', md: 'start' }}>
            <AnimatedNumbers value={50} />+
          </Typography>
          <Typography
            variant='body1'
            color='primary'
            fontSize='24px'
            textAlign={{ xs: 'center', md: 'start' }}
          >
            Sport categories
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default FloatingNumbers
