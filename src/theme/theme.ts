import { ThemeOptions, createTheme } from '@mui/material';

const primaryColor = '#F4E041';
const secondaryColor = '#00BDD3';
const fontColor = '#000000';
const secondaryFontColor = '#7E7E7E';

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768.9,
      lg: 1170,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    background: {
      paper: '#fff',
      default: '#F8F8F8',
    },
    primary: {
      main: primaryColor,
      contrastText: fontColor,
    },
    text: {
      secondary: secondaryFontColor,
    },
    secondary: {
      main: secondaryColor,
      contrastText: secondaryFontColor,
    },
    error: {
      main: '#CB3D40',
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
    fontFamily: ['Nunito', 'sans-serif'].join(','),
    h1: {
      fontSize: '40px',
      lineHeight: '40px',
    },
    allVariants: {
      color: fontColor,
      fontSize: '16px',
      lineHeight: '26px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100px',
          height: '34px',
          textTransform: 'initial',
          borderRadius: '80px',
          boxShadow: 'none',
          color: fontColor,
          ':hover': {
            backgroundColor: '#FFE302',
            boxShadow: 'none',
          },
          ':disabled': {
            backgroundColor: '#B4B4B4',
            color: '#fff',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          ':last-child': {
            paddingBottom: '20px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minHeight: '80px',
          marginBottom: '24px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          lineHeight: '14px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
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
};

export const theme = createTheme(themeOptions);
