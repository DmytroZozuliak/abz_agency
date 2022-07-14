import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import classes from './Header.module.scss';

interface IProps {
  scrollToGetRequestElem: () => void;
  scrollToPostRequestElem: () => void;
}

const Header = ({ scrollToGetRequestElem, scrollToPostRequestElem }: IProps) => {
  return (
    <header>
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <img src="../assets/Logo.svg" alt="logo" />
          <Box className={classes.buttons}>
            <Button variant="contained" color="primary" onClick={scrollToGetRequestElem}>
              Users
            </Button>
            <Button variant="contained" color="primary" onClick={scrollToPostRequestElem}>
              Sign up
            </Button>
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
