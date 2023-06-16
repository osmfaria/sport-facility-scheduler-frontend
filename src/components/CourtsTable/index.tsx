import { convertToCurrency } from '@/utils/functions'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useFacility } from 'providers/FacilityProvider'
import CourtTableRow from '../CourtsRow'

const CourtsTable = () => {
  const { courtsByFacility } = useFacility()

  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Sport
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Capacity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Indoor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Schedule Range (days)
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Operating Hours
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courtsByFacility.map((court) => (
            <CourtTableRow court={court} key={court.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CourtsTable
