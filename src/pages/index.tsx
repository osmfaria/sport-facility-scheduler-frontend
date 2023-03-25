import { Container } from '@mui/system'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { ChangeEvent, useState } from 'react'
import LocationAlert from '../components/LocationAlert'
import axios from 'axios'
import { locationComponent } from 'interfaces/componentsInterface'
import dayjs from 'dayjs'
import { useCourt } from 'providers/courts'
import SearchIcon from '@mui/icons-material/Search'
import CourtsGrid from '../components/CourtsGrid'
import TuneIcon from '@mui/icons-material/Tune'
import FilterDrawer from '../components/FilterDrawer'

export default function Home() {
  const [city, setCity] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true)
  const { getCourtsByLocationAndTime } = useCourt()

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: long } = position.coords
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          )
          .then((res) => {
            if (res.data.status === 'OK') {
              const resArray = res.data.results[0].address_components
              resArray.forEach((component: locationComponent) => {
                if (component.types.indexOf('locality') != -1) {
                  setCity(component.long_name)
                }
              })
            }
          })
          .catch((_) => setCity('vancouver'))
      })
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCity(e.target.value)
  }

  const handleDate = (dateObj: dayjs.Dayjs | null) => {
    if (dateObj) {
      setDate(dateObj.toDate())
    } else {
      setDate(new Date())
    }
  }

  const handleSearch = () => {
    if (date.toString() !== 'Invalid Date') {
      getCourtsByLocationAndTime(city, date)
    }
  }

  const handleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <>
      <FilterDrawer handleDrawer={handleFilterDrawer} isOpen={isFilterOpen} />
      <Container sx={{ paddingTop: '40px' }}>
        <LocationAlert handleLocation={handleLocation} />
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          rowSpacing={2}
        >
          <Grid item>
            <IconButton
              onClick={handleFilterDrawer}
              size='large'
              sx={{ boxShadow: 1, marginRight: 1 }}
            >
              <TuneIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TextField
              name='city'
              value={city}
              variant='outlined'
              label='Location'
              onChange={(e) => handleChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date'
                onChange={(dateObj) => handleDate(dateObj)}
                value={dayjs(date)}
                minDate={dayjs(new Date())}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleSearch}
              size='large'
              sx={{ boxShadow: 1, marginLeft: 1 }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        <CourtsGrid />
      </Container>
    </>
  )
}
