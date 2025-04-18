import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
      light: '#4285f4',
      dark: '#1557b0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#188038',
      light: '#1e8e3e',
      dark: '#137333',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f6f8fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
    error: {
      main: '#d93025',
      light: '#ea4335',
      dark: '#c5221f',
    },
    success: {
      main: '#188038',
      light: '#1e8e3e',
      dark: '#137333',
    },
    grey: {
      50: '#f8f9fa',
      100: '#f1f3f4',
      200: '#e8eaed',
      300: '#dadce0',
      400: '#bdc1c6',
      500: '#9aa0a6',
      600: '#80868b',
      700: '#5f6368',
      800: '#3c4043',
      900: '#202124',
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '1.625rem',
      fontWeight: 400,
      letterSpacing: 0,
    },
    h2: {
      fontSize: '1.375rem',
      fontWeight: 400,
      letterSpacing: 0,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 400,
      letterSpacing: 0,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 400,
      letterSpacing: 0,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: 0,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: 0,
    },
    body1: {
      fontSize: '0.875rem',
      letterSpacing: 0,
    },
    body2: {
      fontSize: '0.8125rem',
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          padding: '6px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#5f6368',
          boxShadow: 'inset 0 -1px 0 0 #dadce0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 12,
          paddingBottom: 12,
          '&.Mui-selected': {
            backgroundColor: '#e8f0fe',
            color: '#1a73e8',
            '&:hover': {
              backgroundColor: '#e8f0fe',
            },
            '& .MuiListItemIcon-root': {
              color: '#1a73e8',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#5f6368',
          minWidth: 40,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
