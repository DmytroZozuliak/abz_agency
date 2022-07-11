import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <img src="../assets/Logo.svg" alt="logo" />
          <Box className={classes.buttons}>
            <Button variant="contained" color="primary" onClick={() => console.log('Users')}>
              Users
            </Button>
            <Button variant="contained" color="primary" onClick={() => console.log('Sign up')}>
              Sign up
            </Button>
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
