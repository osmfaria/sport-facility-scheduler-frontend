import { convertToCurrency } from '@/utils/functions'
import { Button, IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import { Court } from 'interfaces/providerInterface'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Delete } from '@mui/icons-material'
import { sxButton } from './styles'
dayjs.extend(customParseFormat)

const CourtTableRow = ({ court }: { court: Court }) => {
  const price = convertToCurrency(court.price_by_hour)
  const indoor = court.is_indoor ? 'Yes' : 'No'
  const openHour = dayjs(court.opening_hour, 'HH:mm:ss').format('h a')
  const closeHour = dayjs(court.closing_hour, 'HH:mm:ss').format('h a')

  return (
    <TableRow>
      <TableCell>{court.name}</TableCell>
      <TableCell>{court.sport}</TableCell>
      <TableCell>{court.capacity}</TableCell>
      <TableCell>{indoor}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{court.max_schedule_range_in_days}</TableCell>
      <TableCell>
        {openHour} - {closeHour}
      </TableCell>
      <TableCell>
        <Button variant='outlined' size='small' sx={sxButton}>
          Edit
        </Button>
        <Tooltip title='Remove'>
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default CourtTableRow
