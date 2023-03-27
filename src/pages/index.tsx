import { Container } from '@mui/system'
import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Zoom,
} from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { ChangeEvent, FormEvent, useState } from 'react'
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
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const {
    getCourtsByLocationAndTime,
    courts,
    city,
    setCity,
    date,
    setDate,
    isLoading,
  } = useCourt()

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

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (date.toString() !== 'Invalid Date') {
      getCourtsByLocationAndTime()
    }
  }

  const handleFilterDrawer = () => {
    setIsFilterOpen((prev) => !prev)
  }

  console.log(courts)

  return (
    <>
      <Container sx={{ paddingTop: '40px', position: 'relative' }}>
        <FilterDrawer isOpen={isFilterOpen} handleDrawer={handleFilterDrawer} />
        {!!!courts.length && <LocationAlert handleLocation={handleLocation} />}
        <form onSubmit={handleSearch}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            rowSpacing={2}
          >
            <Grid item>
              <Zoom in={!!courts.length && !isFilterOpen}>
                <IconButton
                  color='primary'
                  onClick={handleFilterDrawer}
                  size='large'
                  sx={{
                    boxShadow: 1,
                    marginRight: { xs: 'none', md: 1 },
                    position: { xs: 'absolute', md: 'relative' },
                    top: { xs: '5px', md: '0' },
                    left: { xs: '10px', md: '0' },
                  }}
                >
                  <TuneIcon />
                </IconButton>
              </Zoom>
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
              <IconButton
                size='large'
                sx={{
                  boxShadow: 1,
                  marginLeft: { xs: 'none', md: 1 },
                  position: { xs: 'absolute', md: 'relative' },
                  top: { xs: '5px', md: '0' },
                  right: { xs: '10px', md: '0' },
                }}
                type='submit'
              >
                {isLoading ? (
                  <CircularProgress color='primary' size={24} />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </form>
        <CourtsGrid />
      </Container>
    </>
  )
}
