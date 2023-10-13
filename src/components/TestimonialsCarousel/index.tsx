import Carousel from 'better-react-carousel'
import CarouselCard from '../cards/CarouselCard'
import { Box, useTheme } from '@mui/material'

const TestimonialsCarousel = () => {
  const theme = useTheme()

  const Testimonials = [
    {
      name: 'Emily Johnson',
      rating: 4.5,
      picturePath: '/main/person1.png',
      children:
        'Fantastic app! Easy to use, great selection of venues, and helpful customer support. Highly recommend!',
    },
    {
      name: 'Samantha Lee',
      rating: 5,
      picturePath: '/main/person2.webp',
      children:
        'Love this app for organizing soccer matches. Intuitive design, quick bookings, and excellent venues.',
    },
    {
      name: 'Michael Ramirez',
      rating: 4.5,
      picturePath: '/main/person3.jpg',
      children:
        '"Game-changer for my fitness classes! Quick booking, real-time availability, and diverse locations. Love it!',
    },
    {
      name: 'Jessica Brown',
      rating: 5,
      picturePath: '/main/person4.jpg',
      children:
        'Best tennis court booking app! Seamless process, detailed venue info, and secure payments. Must-have for sports lovers!',
    },
  ]

  return (
    <Carousel
      cols={1}
      rows={1}
      gap={10}
      showDots={true}
      height={'400px'}
      dotColorActive={`${theme.palette.primary.main}`}
    >
      {Testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <Box>
            <CarouselCard
              key={Math.random()}
              name={testimonial.name}
              rating={testimonial.rating}
              picturePath={testimonial.picturePath}
            >
              {testimonial.children}
            </CarouselCard>
          </Box>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default TestimonialsCarousel
