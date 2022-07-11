import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import CardsUsers from './components/CardsUsers';
import EnterView from './components/EnterView';
import Header from './components/Header';
import { lightTheme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Header />
      <Box component="main">
        <EnterView />
        <CardsUsers />
      </Box>
    </ThemeProvider>
  );
}

export default App;
