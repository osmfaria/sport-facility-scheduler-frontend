import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Dashboard = (): ReactElement => {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })


  return <div>Protected Page</div>
}

export default Dashboard
