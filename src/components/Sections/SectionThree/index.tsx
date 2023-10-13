import SectionMarker from '../../Misc/SectionMarker'
import CustomSlideAnimation from '../../customAnimations/CustomSlideAnimation'
import CustomDivider from '../../CustomDivider'
import { Box, Button, Container } from '@mui/material'
import { sxContainer, sxImageWrapper, sxTitle } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CustomGrowAnimation from '../../customAnimations/CustomGrowAnimation'
import CustomTextAnimation from '../../customAnimations/CustomTextAnimation'
import { Fade } from 'react-awesome-reveal'

const SectionThree = () => {
  const router = useRouter()

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <CustomDivider />
      <CustomSlideAnimation direction='left'>
        <SectionMarker>3</SectionMarker>
      </CustomSlideAnimation>
      <Box maxWidth='800px'>
        <CustomTextAnimation
          text='Ready to take your sport experience to the next level?'
          speed={0.1}
          sx={sxTitle}
        />
      </Box>
      <Fade>
        <Button
          variant='contained'
          size='large'
          onClick={() => router.push('/courts')}
        >
          Start here 💪
        </Button>
      </Fade>
      <CustomGrowAnimation>
        <Box sx={sxImageWrapper}>
          <Image
            src='/main/woman.webp'
            alt='athlete'
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
          />
        </Box>
      </CustomGrowAnimation>
    </Container>
  )
}

export default SectionThree
