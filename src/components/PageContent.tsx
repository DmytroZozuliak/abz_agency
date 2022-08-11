import { Box } from '@mui/material';
import { useRef } from 'react';
import CardsUsers from './CardsUsers';
import EnterView from './EnterView';
import Header from './Header';
import PostRequest from './PostRequest';
import { scrollToElement } from '../utils/helpers';

const PageContent = () => {
  const getRequestElement = useRef<HTMLDivElement>(null);
  const postRequestElement = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header
        scrollToGetRequestElem={() => scrollToElement(getRequestElement.current)}
        scrollToPostRequestElem={() => scrollToElement(postRequestElement.current)}
      />
      <Box component="main">
        <EnterView scrollToPostRequestElem={() => scrollToElement(postRequestElement.current)} />
        <CardsUsers ref={getRequestElement} />
        <PostRequest ref={postRequestElement} />
      </Box>
    </>
  );
};

export default PageContent;
