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
            ? { ...customDarkTheme.palette, mode }
            : { ...customLightTheme.palette, mode }),
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
