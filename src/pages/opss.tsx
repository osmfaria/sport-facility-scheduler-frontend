import { Button, Card, CardActions, Divider, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Warning, Undo } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { sxButton, sxCard, sxIcon } from '@/styles/opss.styles'

const opss = () => {
  const router = useRouter()

  return (
    <Card sx={sxCard}>
      <Divider>
        <Warning sx={sxIcon} color='warning' />
      </Divider>
      <Stack spacing={1} textAlign='center'>
        <Typography variant='body1'>Something went wrontg... :(</Typography>
        <Typography variant='body2' color='grey'>
          We are working on fixing the problem
        </Typography>
      </Stack>
      <CardActions>
        <Button
          size='small'
          variant='outlined'
          endIcon={<Undo />}
          sx={sxButton}
          onClick={() => router.push('/')}
        >
          Go back
        </Button>
      </CardActions>
    </Card>
  )
}

export default opss
