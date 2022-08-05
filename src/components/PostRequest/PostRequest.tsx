import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { forwardRef } from 'react';
import Form from '../Form';
import classes from './PostRequest.module.scss';

const PostRequest = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Container maxWidth="lg">
      <Box ref={ref} className={classes.container}>
        <Typography id="post-request" variant="h1" component="h2" marginBottom="50px">
          Working with POST request
        </Typography>
        <Form />
      </Box>
    </Container>
  );
});

export default PostRequest;
