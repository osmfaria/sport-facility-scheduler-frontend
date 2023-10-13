import { childrenProp } from 'interfaces/utilityInterface'
import { UserProvider } from '../providers/user'
import { CourtProvider } from './courts'
import { FacilityProvider } from './FacilityProvider'
import { ScheduleProvider } from './schedule'
import { StepsProvider } from './StepsProvider'
import { ColorModeProvider } from './theme'

const Providers = ({ children }: childrenProp) => {
  return (
    <ColorModeProvider>
      <CourtProvider>
        <ScheduleProvider>
          <FacilityProvider>
            <StepsProvider>
              <UserProvider>{children}</UserProvider>
            </StepsProvider>
          </FacilityProvider>
        </ScheduleProvider>
      </CourtProvider>
    </ColorModeProvider>
  )
}

export default Providers
