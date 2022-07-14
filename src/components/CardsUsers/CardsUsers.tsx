import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { forwardRef, useEffect, useRef } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { fetchMoreUsers, fetchUsers } from '../../store/ActionCreators/ActionCreators';
import CardUser from '../CardUser/CardUser';
import classes from './CardsUsers.module.scss';

const CardsUsers = forwardRef<HTMLDivElement>((props, ref) => {
  const { isLoading, error, users, linkNext, buttonDisable } = useTypedSelector(
    (state) => state.apiSlice
  );
  const dispatch = useTypedDispatch();
  const moreButton = useRef<null | HTMLButtonElement>(null);

  async function getUsers(url: string | null) {
    url && (await dispatch(fetchMoreUsers(url)));
    moreButton.current &&
      moreButton.current.scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: 'smooth',
      });
  }

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box ref={ref} className={classes.container}>
        <Typography variant="h1" component="h2" marginBottom="50px">
          Working with GET request
        </Typography>

        {isLoading && <CircularProgress />}
        {error && <div>{error}</div>}
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          my="50px"
          justifyContent="space-between"
          alignItems="center"
        >
          {users && users.map((user) => <CardUser key={user.id} user={user} />)}
        </Grid>

        <Button
          disabled={buttonDisable}
          onClick={() => getUsers(linkNext)}
          variant="contained"
          color="primary"
          ref={moreButton}
          sx={{ width: '120px' }}
        >
          Show more
        </Button>
      </Box>
    </Container>
  );
});

export default CardsUsers;
