import { StepsProviderContext } from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

const StepsContext = createContext<StepsProviderContext>(
  {} as StepsProviderContext
)

export const StepsProvider = ({ children }: childrenProp) => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    'Select a sports venue',
    'Review venue details',
    'Select a time slot',
  ]

  const handleNext = (page: string): void => {
    router.push(page)
  }

  const handleBack = (page: string) => {
    if (activeStep > 0) {
      router.push(page)
    }
  }

  const selectCurrentStep = (step: number) => {
    setActiveStep(step)
  }

  return (
    <StepsContext.Provider
      value={{ handleNext, handleBack, steps, activeStep, selectCurrentStep }}
    >
      {children}
    </StepsContext.Provider>
  )
}

export const useSteps = () => useContext(StepsContext)
