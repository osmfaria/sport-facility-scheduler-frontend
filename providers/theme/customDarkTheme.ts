import {
  CustomDarkThemeConfig,
  CustomLightThemeConfig,
} from 'interfaces/providerInterface'

export const customDarkTheme: CustomDarkThemeConfig = {
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

export const customLightTheme: CustomLightThemeConfig = {
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#333333',
    },
    secondary: {
      main: '#0070F3',
      light: '#146DD6',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#888888',
    },
    grey: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
}
