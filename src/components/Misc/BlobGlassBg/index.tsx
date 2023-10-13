import { Box } from "@mui/material"
import Image from "next/image"
import blob from '../../../../public/blob.svg'
import { blobStyles, boxStyles } from "./styles"

const BlobGlassBg = () => {
  return (
    <>
      <Box
        sx={boxStyles}
      />
      <Image
        src={blob}
        height='300'
        width='300'
        alt='blob'
        style={blobStyles}
      />
    </>
  )
}

export default BlobGlassBg