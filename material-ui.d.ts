import { PaletteOptions, Palette } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {
    calendarGroupButton: {
      primary: string
      secondary: string
    }
  }

  export interface Palette {
    calendarGroupButton: {
      primary: string
      secondary: string
    }
  }
}
