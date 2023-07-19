import { DeleteOutline } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { RemoveModalProps } from 'interfaces/componentsInterface'
import { useSession } from 'next-auth/react'
import { useFacility } from 'providers/FacilityProvider'

const RemoveFacilityModal = ({
  isOpen,
  handleClose,
  name,
  id,
}: RemoveModalProps) => {
  const { isLoading, removeFacility } = useFacility()
  const { data: session } = useSession()
  const handleDelete = async () => {
    await removeFacility(session!.user.accessToken, id)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Would you like to remove {name} Facility?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All associated sport venues and events that may have been scheduled
          will also be canceled and removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant='text'
          color='error'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<DeleteOutline />}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
        <Button variant='outlined' onClick={handleClose}>
          Go back
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveFacilityModal
