import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
