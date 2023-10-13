import { Box, Stack, Typography } from '@mui/material'
import SportsCard from '../cards/SportsCard'

const SportsGrid = () => {
  return (
    <Box mb='200px'>
      <Typography
        variant='h2'
        fontSize={{ xs: '30px', md: '40px' }}
        textAlign='center'
        m='40px 0'
      >
        🔥 Trending sports
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems='center'
        justifyContent='center'
      >
        <SportsCard
          sport='Soccer'
          imagePath='/main/soccer-court.webp'
          logoPath='/sportsIcons/football.svg'
        />
        <SportsCard
          sport='Basketball'
          imagePath='/main/basket-court.webp'
          logoPath='/sportsIcons/basketball.svg'
        />
        <SportsCard
          sport='Swimming'
          imagePath='/main/swimmer.webp'
          logoPath='/sportsIcons/swimming.svg'
        />
      </Stack>
    </Box>
  )
}

export default SportsGrid
