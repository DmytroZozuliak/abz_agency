import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { useEffect, useRef } from 'react';
import CardsUsers from './components/CardsUsers';
import EnterView from './components/EnterView';
import Header from './components/Header';
import PostRequest from './components/PostRequest';
import { useTypedDispatch } from './hooks/redux';
import { getToken } from './store/ActionCreators/ActionCreators';
import { theme } from './theme/theme';

function App() {
  const getRequestElement = useRef<HTMLDivElement>(null);
  const postRequestElement = useRef<HTMLDivElement>(null);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getToken(null));
  }, []);

  const scrollToGetRequestElem = () => {
    getRequestElement.current &&
      getRequestElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToPostRequestElem = () => {
    postRequestElement.current &&
      postRequestElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        scrollToGetRequestElem={scrollToGetRequestElem}
        scrollToPostRequestElem={scrollToPostRequestElem}
      />
      <Box component="main">
        <EnterView scrollToPostRequestElem={scrollToPostRequestElem} />
        <CardsUsers ref={getRequestElement} />
        <PostRequest ref={postRequestElement} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
