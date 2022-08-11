import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import SnackPopup from './components/SnackPopup';
import PageContent from './components/PageContent';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageContent />
      <SnackPopup />
    </ThemeProvider>
  );
}

export default App;
