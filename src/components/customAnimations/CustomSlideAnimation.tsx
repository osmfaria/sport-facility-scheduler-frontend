import { Box, SxProps, Typography } from '@mui/material'
import { Variants, motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

const slide = (direction: 'left' | 'right'): Variants => ({
  initial: {
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
})

const MotionBox = motion(Box)

const CustomSlideAnimation = ({
  children,
  direction = 'left',
}: {
  children: ReactNode
  direction: 'left' | 'right'
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <MotionBox
      ref={ref}
      variants={slide(direction)}
      initial='initial'
      animate={isInView ? 'animate' : ''}
    >
      {children}
    </MotionBox>
  )
}

export default CustomSlideAnimation
