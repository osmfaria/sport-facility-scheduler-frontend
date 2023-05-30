import { keyframes } from '@emotion/react'
import { CustomAnimationProp } from 'interfaces/componentsInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { Fade, Reveal } from 'react-awesome-reveal'

const createCustomAnimation = (direction: 'left' | 'right') => keyframes`
from {
  opacity: 0;
  transform: ${
    direction === 'right' ? 'translateX(100px)' : 'translateX(-100px)'
  };
}
to {
  opacity: 1;
  transform: translateX(0);
}
`
const CustomAnimation = ({
  children,
  direction = 'right',
}: CustomAnimationProp) => {
  const customAnimation = createCustomAnimation(direction)
  return (
    <Reveal keyframes={customAnimation} triggerOnce cascade>
      {children}
    </Reveal>
  )
}

export default CustomAnimation
