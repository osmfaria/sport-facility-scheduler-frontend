import { ThemeProvider, createTheme } from '@mui/material/styles'
import {
  createContext,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { childrenProp } from 'interfaces/utilityInterface'
import { ColorModeContext } from 'interfaces/providerInterface'
import { customDarkTheme, customLightTheme } from './customDarkTheme'

const ColorModeContext = createContext<ColorModeContext>({} as ColorModeContext)

export const ColorModeProvider = ({ children }: childrenProp) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const colorMode = useMemo<ColorModeContext>(
    () => ({
      toggleColorMode: (event: SyntheticEvent, value: string) => {
        localStorage.setItem('theme-courtscheduler', JSON.stringify(value))
        if (value) {
          const toggledValue = value === 'dark' ? 'dark' : 'light'
          setMode(toggledValue)
        }
      },
      mode: mode,
    }),
    []
  )

  useEffect(() => {
    const storedMode = localStorage.getItem('theme-courtscheduler')
    const initialMode = JSON.parse(storedMode!) === 'dark' ? 'dark' : 'light'
    setMode(initialMode)
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          button: {
            textTransform: 'none',
            fontWeight: '600',
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                '&:-webkit-autofill': {
                  transition: 'background-color 5000s ease-in-out 0s',
                },
              },
            },
          },
        },
        palette: {
          ...(mode === 'dark'
            ? {
                ...customDarkTheme.palette,
                mode,
                calendarGroupButton: {
                  primary: 'rgba(255, 255, 255, 0.12)',
                  secondary: 'rgba(51, 51, 51, 0.12)',
                },
              }
            : {
                ...customLightTheme.palette,
                mode,
                calendarGroupButton: {
                  primary: 'rgba(0, 0, 0, 0.12)',
                  secondary: 'rgba(255, 255, 255, 0.16)',
                },
              }),
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={{ ...colorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => useContext(ColorModeContext)
