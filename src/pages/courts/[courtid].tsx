import { Container } from '@mui/material'
import { useRouter } from 'next/router'

const Court = () => {
  const router = useRouter()
  const { courtid } = router.query
  return <Container sx={{ paddingTop: '40px' }}>Court {courtid}</Container>
}

export default Court
