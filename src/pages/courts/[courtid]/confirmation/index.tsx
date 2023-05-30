import { Box, Typography } from '@mui/material'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { Stack } from '@mui/system'
import ConfirmationCard from '../../../../components/cards/ConfirmationCard'
import { GetServerSidePropsContext } from 'next'

const Confirmation = () => {
  return (
    <Box paddingTop='60px' textAlign='center'>
      <Typography variant='h5' marginBottom='20px'>
        Thank you! Your booking is confirmed.
      </Typography>
      <Typography color='GrayText'>
        We're excited to welcome you to our facility.
      </Typography>
      <Typography color='GrayText'>
        Please check your email for details about your reservation.
      </Typography>
      <Stack alignItems={'center'}>
        <Typography variant='overline' marginTop='70px'>
          Appointment Details:
        </Typography>
        <KeyboardDoubleArrowDownIcon />
      </Stack>
      <ConfirmationCard />
    </Box>
  )
}

export default Confirmation

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const referrer = context.req.headers.referer || ''
  const baseUrl = context.req.headers.host // Gets the base URL, e.g., "localhost:3000"

  // Check if the route that requested this page matches the regex, otherwise redirect home
  const allowedReferrerPattern = new RegExp(
    `^http://${baseUrl}/courts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/booking`
  )

  if (!allowedReferrerPattern.test(referrer)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
