import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import { sxFormControl, sxSekeletonText } from './styles'
import { CustomSelectProps } from 'interfaces/componentsInterface'

const CustomSelect = ({
  isLoading,
  item,
  itemArray,
  handleChange,
  helperText,
  icon,
}: CustomSelectProps) => {
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant='rounded' width={'100%'} height={'56px'} />
          <Skeleton variant='text' sx={sxSekeletonText} />
        </>
      ) : (
        <>
          {item && (
            <FormControl sx={sxFormControl}>
              <Select
                startAdornment={icon}
                value={item.id}
                onChange={handleChange}
              >
                {itemArray!.map((elem) => (
                  <MenuItem value={elem.id} key={elem.id}>
                    {elem.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          )}
        </>
      )}
    </>
  )
}

export default CustomSelect
