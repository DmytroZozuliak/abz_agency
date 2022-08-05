import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import Form from '../Form';
import classes from './PostRequest.module.scss';

const PostRequest = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box ref={ref} component="section" className={`container ${classes.container}`}>
      <Typography id="post-request" variant="h1" component="h2" marginBottom="50px">
        Working with POST request
      </Typography>
      <Form />
    </Box>
  );
});

export default PostRequest;
