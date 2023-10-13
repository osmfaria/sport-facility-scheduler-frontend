import { keyframes } from '@emotion/react'
import { childrenProp } from 'interfaces/utilityInterface'
import { Reveal } from 'react-awesome-reveal'

const customAnimation = keyframes`
from {
  transform: scale3d(0.85, 0.85, 0.85)
}
to {
  transform scale3d(1, 1, 1)
}
`
const CustomGrowAnimation = ({ children }: childrenProp) => {
  return (
    <Reveal keyframes={customAnimation} triggerOnce duration={8000}>
      {children}
    </Reveal>
  )
}

export default CustomGrowAnimation
