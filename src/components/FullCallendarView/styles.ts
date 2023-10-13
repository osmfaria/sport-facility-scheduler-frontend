import { Theme } from '@mui/material'

export const sxCalendarWrap = (theme: Theme) => ({
  '& .fc-toolbar-chun': {
    background: theme.palette.background.paper,
  },
  '& .fc .fc-button': {
    border: `1px solid ${theme.palette.calendarGroupButton.primary}`,
    fontSize: '15px',
    fontWeight: '600',
    '&:active': {
      background: theme.palette.calendarGroupButton.primary,
      color: theme.palette.primary.light,
    },
  },
  '& .fc-toolbar-title': {
    fontSize: '20px',
  },
  '& .fc-button-primary': {
    color: theme.palette.primary.light,
    background: 'transparent',
    '&:hover': {
      background: theme.palette.calendarGroupButton.secondary,
      color: theme.palette.primary.light,
    },
  },
  '& .fc .fc-button-primary:not(:disabled).fc-button-active:focus': {
    boxShadow: 'none',
  },
  '& .fc .fc-button-primary:not(:disabled).fc-button-active': {
    background: theme.palette.calendarGroupButton.primary,
    color: theme.palette.primary.light,
    border: `1px solid ${theme.palette.calendarGroupButton.primary}`,
  },
})
