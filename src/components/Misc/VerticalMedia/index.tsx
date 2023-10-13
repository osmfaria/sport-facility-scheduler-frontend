import { Box, IconButton, Stack, Typography } from '@mui/material'
import { sxLine, sxBox, sxIconButton } from './styles'
import { FacebookOutlined, Instagram, LinkedIn } from '@mui/icons-material'

function VerticalMedia() {
  return (
    <Box sx={sxBox}>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography
          variant='caption'
          fontSize='16px'
          fontWeight='500'
          // color='GrayText'
        >
          SHARE
        </Typography>
        <Box component='span' sx={sxLine}></Box>
        <Stack direction='row' alignItems='center' gap={1}>
          <IconButton sx={sxIconButton}>
            <Instagram />
          </IconButton>
          <IconButton sx={sxIconButton}>
            <FacebookOutlined />
          </IconButton>
          <IconButton sx={sxIconButton}>
            <LinkedIn />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default VerticalMedia
