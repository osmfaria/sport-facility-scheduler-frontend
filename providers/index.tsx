import { childrenProp } from 'interfaces/utilityInterface'
import { UserProvider } from '../providers/user'

const Providers = ({ children }: childrenProp) => {
  return <UserProvider>{children}</UserProvider>
}

export default Providers
