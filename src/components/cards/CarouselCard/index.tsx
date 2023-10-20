import { Box, Rating, Stack, Typography } from '@mui/material'
import { sxCard, sxImageWrapper } from './styles'
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
            <Image
              src='/sectionIcons/open-quote.svg'
              alt='open quote'
              height='65'
              width='65'
            />
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
            <Typography color='white'>{children}</Typography>
            <Image
              src='/sectionIcons/close-quote.svg'
              alt='open quote'
              height='65'
              width='65'
              style={{ float: 'right' }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default CarouselCard
