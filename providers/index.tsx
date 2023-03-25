import { childrenProp } from 'interfaces/utilityInterface'
import { UserProvider } from '../providers/user'
import { CourtProvider } from './courts'
import { ColorModeProvider } from './theme'

const Providers = ({ children }: childrenProp) => {
  return (
    <ColorModeProvider>
      <CourtProvider>
        <UserProvider>{children}</UserProvider>
      </CourtProvider>
    </ColorModeProvider>
  )
}

export default Providers
