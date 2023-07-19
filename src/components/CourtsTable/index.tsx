import {
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
import RemoveCourtModal from '../modals/RemoveCourtModal'
import { useState } from 'react'

const CourtsTable = () => {
  const { courtsByFacility } = useFacility()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalCourtName, setModalCourtName] = useState<string>('')
  const [modalCourtId, setModalCourtId] = useState<string>('')

  const handleClose = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleModalData = (name: string, id: string) => {
    setModalCourtName(name)
    setModalCourtId(id)
    setIsModalOpen(true)
  }

  return (
    <>
      <RemoveCourtModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        name={modalCourtName}
        id={modalCourtId}
      />
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
            {courtsByFacility!.map((court) => (
              <CourtTableRow
                court={court}
                key={court.id}
                handleModalData={handleModalData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CourtsTable
