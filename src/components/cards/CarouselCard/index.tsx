import { Box, Rating, Stack, Typography } from '@mui/material'
import { sxCard, sxDetialWrapper, sxImageWrapper } from './styles'
import Image from 'next/image'
import styled from '@emotion/styled'
import { CarouselCardProps } from 'interfaces/componentsInterface'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    color: '#f1f1f1',
  },
})

const CarouselCard = ({
  name,
  rating,
  picturePath,
  children,
}: CarouselCardProps) => {
  return (
    <Box position='relative' maxWidth='800px' minHeight='300px' m='auto'>
      <Box
        minHeight='300px'
        position='relative'
        borderRadius='30px'
        mb='20px'
        border={(theme) => `1px solid ${theme.palette.common.black}`}
        sx={sxCard}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='center'
          minHeight='300px'
        >
          <Box height='100%' minWidth='30%'>
            <Box sx={sxImageWrapper}>
              <Image
                src={picturePath}
                alt='cloud'
                fill
                priority
                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw'
              />
            </Box>
          </Box>
          <Box
            flexGrow={1}
            padding={{ xs: '0 15px', md: '0 45px' }}
            height='100%'
          >
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              spacing={3}
              mb='12px'
            >
              <Typography color='white' fontWeight='600'>
                {name}
              </Typography>
              <StyledRating readOnly value={rating} precision={0.5} />
            </Stack>
            <Box sx={sxDetialWrapper}>
              <Image
                src='/sectionIcons/open-quote.svg'
                alt='open quote'
                fill
                sizes='(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 5vw'
              />
            </Box>
            <Typography color='white' padding='10px 10px'>
              {children}
            </Typography>
            <Box sx={{ ...sxDetialWrapper, float: 'right' }}>
              <Image
                src='/sectionIcons/close-quote.svg'
                alt='open quote'
                fill
                sizes='(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 5vw'
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default CarouselCard
