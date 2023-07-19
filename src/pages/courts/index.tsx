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
import { FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import LocationAlert from '../../components/LocationAlert'
import axios from 'axios'
import { locationComponent } from 'interfaces/componentsInterface'
import dayjs from 'dayjs'
import { useCourt } from 'providers/courts'
import SearchIcon from '@mui/icons-material/Search'
import CourtsGrid from '../../components/CourtsGrid/CourtsGrid'
import TuneIcon from '@mui/icons-material/Tune'
import FilterDrawer from '../../components/FilterDrawer'
import { useSchedule } from 'providers/schedule'
import CustomStepper from '../../components/Misc/CustomStepper'
import { useSteps } from 'providers/StepsProvider'
import { containerStyles, inputStyles } from '@/styles/courts.styles'

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isLocationShared, setIsLocationShared] = useState<boolean>(false)
  const { selectDate, selectedDate } = useSchedule()

  const {
    getCourtsByLocationAndTime,
    courts,
    city,
    selectCity,
    isLoadingCourts,
  } = useCourt()
  const { selectCurrentStep } = useSteps()

  useEffect(() => {
    selectCurrentStep(0)

    const storedCity = JSON.parse(
      localStorage.getItem('location-courtscheduler') || '""'
    )
    if (storedCity) selectCity(storedCity)

    const privacySettings = JSON.parse(
      localStorage.getItem('location-sharing') || '"yes"'
    )

    setIsLocationShared(privacySettings === 'yes')
  }, [])

  useEffect(() => {
    getCourtsByLocationAndTime(selectedDate)
  }, [selectedDate])

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
                  selectCity(component.long_name)
                  localStorage.setItem(
                    'location-courtscheduler',
                    JSON.stringify(component.long_name)
                  )
                }
              })
            }
          })
          .catch((_) => selectCity('vancouver'))
      })
    }
  }

  const handlePrivacy = () => {
    localStorage.setItem('location-sharing', JSON.stringify('no'))
    setIsLocationShared(false)
  }

  const handleDate = (dateObj: dayjs.Dayjs | null) => {
    if (dateObj) {
      selectDate(dateObj.toDate())
    } else {
      selectDate(new Date())
    }
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedDate.toString() !== 'Invalid Date') {
      getCourtsByLocationAndTime(selectedDate)
    }
  }

  const handleFilterDrawer = () => {
    setIsFilterOpen((prev) => !prev)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (selectedDate.toString() !== 'Invalid Date' && city.length > 0) {
        getCourtsByLocationAndTime(selectedDate)
      }
    }
  }

  return (
    <>
      <Container sx={containerStyles}>
        <FilterDrawer isOpen={isFilterOpen} handleDrawer={handleFilterDrawer} />
        <CustomStepper />
        {isLocationShared && city.length == 0 && (
          <LocationAlert
            handleLocation={handleLocation}
            handlePrivacy={handlePrivacy}
          />
        )}
        <form onSubmit={handleSearch}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            rowSpacing={3}
            columnSpacing={1}
          >
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Date'
                  sx={inputStyles}
                  onChange={(dateObj) => handleDate(dateObj)}
                  value={dayjs(selectedDate)}
                  minDate={dayjs(new Date())}
                  maxDate={dayjs(new Date()).add(50, 'day')}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='city'
                value={city}
                sx={inputStyles}
                variant='outlined'
                label='Location'
                onChange={(e) => selectCity(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      <IconButton size='large' type='submit' color='primary'>
                        {isLoadingCourts ? (
                          <CircularProgress color='primary' size={24} />
                        ) : (
                          <SearchIcon />
                        )}
                      </IconButton>
                      <>
                        {courts && !!courts.length && !isFilterOpen && (
                          <Zoom in={!!courts.length && !isFilterOpen}>
                            <IconButton
                              color='primary'
                              onClick={handleFilterDrawer}
                              size='large'
                            >
                              <TuneIcon />
                            </IconButton>
                          </Zoom>
                        )}
                      </>
                    </>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </form>

        <CourtsGrid source='schedule' />
      </Container>
    </>
  )
}
