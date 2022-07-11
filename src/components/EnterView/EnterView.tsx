import { Box, Button, Container, Typography } from '@mui/material';
import classes from './EnterView.module.scss';

const EnterView = () => {
  return (
    <Box className={classes.container}>
      <Box className={classes.typography}>
        <Typography variant="h1" color="white" textAlign="center">
          Test assignment for front-end developer
        </Typography>
        <Typography color="white" textAlign="center" mt="21px" mb="32px">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
          with a vast understanding of User design thinking as they&apos;ll be building web
          interfaces with accessibility in mind. They should also be excited to learn, as the world
          of Front-End Development keeps evolving.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => console.log('Sign up')}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default EnterView;
