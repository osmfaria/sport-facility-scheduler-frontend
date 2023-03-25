import { CustomThemeConfig } from 'interfaces/providerInterface'

export const customDarkTheme: CustomThemeConfig = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#007fff',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0A1929',
      paper: '#001E3C',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B2BAC2',
    },
  },
}
