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
import FacilityRow from '../FacilityRow'
import RemoveFacilityModal from '../modals/RemoveFacilityModal'
import { useState } from 'react'

const FacilityTable = () => {
  const { facilitiesByOwner } = useFacility()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalFacilityName, setModalFacilityName] = useState<string>('')
  const [modalFacilityId, setModalFacilityId] = useState<string>('')

  const handleClose = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleModalData = (name: string, id: string) => {
    setModalFacilityName(name)
    setModalFacilityId(id)
    setIsModalOpen(true)
  }

  return (
    <>
      <RemoveFacilityModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        name={modalFacilityName}
        id={modalFacilityId}
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
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='inherit' fontWeight={600}>
                  Phone Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='inherit' fontWeight={600}>
                  Sport Venues
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='inherit' fontWeight={600}>
                  City
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilitiesByOwner!.map((facility) => (
              <FacilityRow
                facility={facility}
                key={facility.id}
                handleModalData={handleModalData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default FacilityTable
