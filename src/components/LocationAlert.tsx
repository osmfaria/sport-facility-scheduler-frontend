import { Collapse, Grid } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { ReactElement, useState } from 'react'
import { LocationAlertProps } from 'interfaces/componentsInterface'

const LocationAlert = ({
  handleLocation,
}: LocationAlertProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <Collapse in={isOpen} sx={{ maxWidth: '350px', margin: '0 auto 35px' }}>
      <Alert
        onClose={() => setIsOpen(false)}
        action={
          <Grid>
            <Button
              color='inherit'
              size='small'
              onClick={() => {
                setIsOpen(false)
                handleLocation()
              }}
            >
              Allow
            </Button>
            <Button
              color='inherit'
              size='small'
              onClick={() => setIsOpen(false)}
            >
              Block
            </Button>
          </Grid>
        }
        severity='info'
      >
        Share your location
      </Alert>
    </Collapse>
  )
}

export default LocationAlert
