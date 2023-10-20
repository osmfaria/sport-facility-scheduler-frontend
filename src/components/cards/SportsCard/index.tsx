import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import {
  sxBox,
  sxDescriptionBox,
  sxDescription,
  sxLogo,
  sxButton,
} from './style'
import { Launch } from '@mui/icons-material'
import { SportsCardProps } from 'interfaces/componentsInterface'
import { useRouter } from 'next/router'
import { useCourt } from 'providers/courts'
import { capitalize } from '../../../utils/functions'

const SportsCard = ({ sport, imagePath, logoPath }: SportsCardProps) => {
  const router = useRouter()
  const { selectSport } = useCourt()

  const handleClick = () => {
    const formattedSport = capitalize(sport)
    selectSport(formattedSport)
    router.push('/courts')
  }

  return (
    <Box
      height='320px'
      maxWidth='300px'
      width='100vw'
      sx={sxBox}
      onClick={handleClick}
    >
      <Image
        className='categoryImage'
        src={imagePath}
        alt='sport category'
        fill
        sizes='(max-width: 768px) 90vw, (max-width: 1200px) 33vw, 33vw'
      />
      <Box sx={sxDescriptionBox}></Box>
      <Box sx={sxLogo} className='logo'>
        <Image
          src={logoPath}
          alt={sport}
          height={140}
          width={140}
          priority
          sizes='(max-width: 768px) 80vw, (max-width: 1200px) 33vw'
        />
      </Box>
      <Box sx={sxDescription}>
        <Typography color='white'>
          Come and practice {sport} in a facility near you!
        </Typography>
      </Box>
      <Box sx={sxButton}>
        <Button variant='outlined' color='inherit' endIcon={<Launch />}>
          Start Here
        </Button>
      </Box>
    </Box>
  )
}

export default SportsCard
