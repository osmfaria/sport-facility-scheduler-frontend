import { convertToCurrency } from '@/utils/functions'
import { Button, IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Delete } from '@mui/icons-material'
import { sxButton, sxTableCell } from './styles'
import { CourtRowProps } from 'interfaces/componentsInterface'
import { useRouter } from 'next/router'
dayjs.extend(customParseFormat)

const CourtTableRow = ({ court, handleModalData }: CourtRowProps) => {
  const router = useRouter()
  const price = convertToCurrency(court.price_by_hour)
  const indoor = court.is_indoor ? 'Yes' : 'No'
  const openHour = dayjs(court.opening_hour, 'HH:mm:ss').format('h a')
  const closeHour = dayjs(court.closing_hour, 'HH:mm:ss').format('h a')

  const handleClickDelete = () => {
    handleModalData(court.name, court.id)
  }

  const handleClickEdit = () => {
    router.push(
      `/dashboard/courtmanager/${court.sport_facility.id}/${court.id}`
    )
  }

  return (
    <TableRow>
      <TableCell sx={sxTableCell}>{court.name}</TableCell>
      <TableCell sx={sxTableCell}>{court.sport}</TableCell>
      <TableCell sx={sxTableCell}>{court.capacity}</TableCell>
      <TableCell sx={sxTableCell}>{indoor}</TableCell>
      <TableCell sx={sxTableCell}>{price}</TableCell>
      <TableCell sx={sxTableCell}>{court.max_schedule_range_in_days}</TableCell>
      <TableCell sx={sxTableCell}>
        {openHour} - {closeHour}
      </TableCell>
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

export default CourtTableRow
