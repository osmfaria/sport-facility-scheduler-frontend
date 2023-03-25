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
import { customDarkTheme } from './customDarkTheme'

const ColorModeContext = createContext<ColorModeContext>({} as ColorModeContext)

export const ColorModeProvider = ({ children }: childrenProp) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const colorMode = useMemo<ColorModeContext>(
    () => ({
      toggleColorMode: (event: SyntheticEvent, value: string) => {
        localStorage.setItem('theme-courtscheduler', JSON.stringify(value))
        const toggledValue = value === 'dark' ? 'dark' : 'light'
        setMode(toggledValue)
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
        palette: {
          mode,
        },
        ...(mode === 'dark' ? customDarkTheme : {}),
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
