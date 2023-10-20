import { Box, Stepper, Step, StepLabel, StepIconProps } from '@mui/material'
import { useSteps } from 'providers/StepsProvider'
import { Stadium, Place, CalendarMonth, Check } from '@mui/icons-material'

import { styled } from '@mui/material/styles'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { sxBox } from './styles'

const CustomStepper = () => {
  const { activeStep, steps } = useSteps()

  return (
    <Box sx={sxBox}>
      {steps && (
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  )
}

// Fancy customization, colors, icons, connector

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.light,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.light,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.success.light,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.light,
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <Stadium />,
    2: <Place />,
    3: <CalendarMonth />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <Check /> : <>{icons[String(props.icon)]}</>}
    </ColorlibStepIconRoot>
  )
}

export default CustomStepper
