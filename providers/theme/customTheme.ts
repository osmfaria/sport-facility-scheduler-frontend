import {
  CustomDarkThemeConfig,
  CustomLightThemeConfig,
} from 'interfaces/providerInterface'

import { pink } from '@mui/material/colors'

export const customDarkTheme: CustomDarkThemeConfig = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3D99FF',
      light: '#3C97FF',
      dark: '#3C97FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#993DFF',
    },
    background: {
      default: '#141A1F',
      paper: '#0E202F',
    },
    text: {
      primary: '#ffffff',
      secondary: '#fafafa',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
}

export const customLightTheme: CustomLightThemeConfig = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ee0979',
      light: pink[400],
      dark: pink[700],
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff6a00',
      light: '#146DD6',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#383838',
      secondary: '#808080',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
}
