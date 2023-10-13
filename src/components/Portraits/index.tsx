import { Box } from '@mui/material'
import Image from 'next/image'
import { sxImageWrapper } from './styles'
import user from '../../../public/main/user-phone.webp'

function Portraits() {
  return (
    <Box sx={sxImageWrapper}>
      <Image
        src={user}
        alt='athlete'
        fill
        sizes='(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw'
      />
    </Box>
  )
}

export default Portraits
