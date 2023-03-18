import { Backdrop, CircularProgress } from '@mui/material'
import { LoadingBackdropProps } from 'interfaces/componentsInterface'
import React, { ReactElement } from 'react'

const LoadingBackdrop = ({ isLoading }: LoadingBackdropProps): ReactElement => {
  return (
    <Backdrop open={isLoading}>
      <CircularProgress color='secondary' />
    </Backdrop>
  )
}

export default LoadingBackdrop
