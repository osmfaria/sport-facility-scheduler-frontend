import { Button, IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Delete } from '@mui/icons-material'
import { sxButton, sxTableCell } from './styles'
import { FacilityRowProps } from 'interfaces/componentsInterface'
import { useRouter } from 'next/router'
dayjs.extend(customParseFormat)

const FacilityRow = ({ facility, handleModalData }: FacilityRowProps) => {
  const numberOfVenues = facility.courts.length
  const router = useRouter()

  const handleClickDelete = () => {
    handleModalData(facility.name, facility.id)
  }

  const handleClickEdit = () => {
    router.push(`/dashboard/facilitymanager/${facility.id}`)
  }

  return (
    <TableRow>
      <TableCell sx={sxTableCell}>{facility.name}</TableCell>
      <TableCell sx={sxTableCell}>{facility.email}</TableCell>
      <TableCell sx={sxTableCell}>{facility.phone_number}</TableCell>
      <TableCell sx={sxTableCell}>{numberOfVenues}</TableCell>
      <TableCell sx={sxTableCell}>{facility.address.city}</TableCell>
      <TableCell sx={sxTableCell}>
        <Button
          variant='outlined'
          size='small'
          sx={sxButton}
          onClick={handleClickEdit}
        >
          Edit
        </Button>
        <Tooltip title='Remove'>
          <IconButton onClick={handleClickDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default FacilityRow
