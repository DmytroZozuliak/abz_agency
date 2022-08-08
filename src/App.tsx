import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { useEffect, useRef } from 'react';
import CardsUsers from './components/CardsUsers';
import EnterView from './components/EnterView';
import Header from './components/Header';
import PostRequest from './components/PostRequest';
import SnackPopup from './components/SnackPopup';
import { useTypedDispatch } from './hooks/redux';
import { getToken } from './store/ActionCreators/ActionCreators';
import { theme } from './theme/theme';
import { scrollToElement } from './utils/helpers';

function App() {
  const getRequestElement = useRef<HTMLDivElement>(null);
  const postRequestElement = useRef<HTMLDivElement>(null);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    console.log('App render effect');
    dispatch(getToken(null));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        scrollToGetRequestElem={() => scrollToElement(getRequestElement.current)}
        scrollToPostRequestElem={() => scrollToElement(postRequestElement.current)}
      />
      <Box component="main">
        <EnterView scrollToPostRequestElem={() => scrollToElement(postRequestElement.current)} />
        <CardsUsers ref={getRequestElement} />
        <PostRequest ref={postRequestElement} />
      </Box>
      <SnackPopup />
    </ThemeProvider>
  );
}

export default App;
