/* eslint-disable prettier/prettier */
import { ThemeOptions, createTheme } from '@mui/material';

const primaryColor = '#689f38';
const fontColor = 'coral';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: '#e3e3e3',
      default: 'grey',
    },
    primary: {
      main: primaryColor,
      contrastText: fontColor,
    },
    secondary: {
      main: '#e1e1e1',
      contrastText: fontColor,
    },
    error: {
      main: '#ffa6a4',
      contrastText: fontColor,
    },
    warning: {
      main: '#bb0000',
      contrastText: fontColor,
    },
    info: {
      main: '#0073c5',
      contrastText: fontColor,
    },
    success: {
      main: '#2d702d',
      contrastText: fontColor,
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    // fontFamily: [
    //   'Chilanka',
    //   'cursive',
    // ].join(','),
    allVariants: {
      color: fontColor,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'color-picker-search' && {
            '&.Mui-selected': {
              display: 'none',
            },
          }),
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'footer-container' && {
            backgroundColor: primaryColor,
          }),
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryColor,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#fefefe',
            ':hover': {
              color: '#cfcfcf',
              background: 'transparent',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
                background: 'transparent',
              },
            })),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#fefefe',
            ':hover': {
              color: '#cfcfcf',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
              },
            }) || {
            '&.MuiButton-containedPrimary': {
              ':hover': {
                backgroundColor: '#7dbf46',
              },
            },
          }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '5px',
            height: '15px',
            backgroundColor: '#d8d8d8',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#b8b8b8',
          },
        },
      },
    },
  },
  spacing: 7,
  shape: {
    borderRadius: 6,
  },
};

export const lightTheme = createTheme(themeOptions);
