import { Box, SxProps, Typography } from '@mui/material'
import { Variants, motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const quote = (speed: number): Variants => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: speed,
    },
  },
})

const singleWord: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

const MotionTypography = motion(Typography)
const MotionBox = motion(Box)

const CustomTextAnimation = ({
  text,
  sx,
  speed,
}: {
  text: string
  sx?: SxProps
  speed: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Box
      m='auto'
      display='flex'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      overflow='hidden'
      ref={ref}
    >
      <MotionTypography
        variant='h1'
        sx={sx}
        variants={quote(speed)}
        initial='initial'
        animate={isInView ? 'animate' : ''}
      >
        {text.split(' ').map((word, index) => (
          <MotionBox
            component='span'
            key={word + index}
            display='inline-block'
            variants={singleWord}
          >
            {word}&nbsp;
          </MotionBox>
        ))}
      </MotionTypography>
    </Box>
  )
}

export default CustomTextAnimation
