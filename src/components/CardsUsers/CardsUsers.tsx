import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { forwardRef, useEffect, useRef } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { fetchMoreUsers, fetchUsers } from '../../store/ActionCreators/ActionCreators';
import CardUser from '../CardUser/CardUser';
import classes from './CardsUsers.module.scss';

const CardsUsers = forwardRef<HTMLDivElement>((_, ref) => {
  const { isLoading, error, users, linkNext, buttonDisable } = useTypedSelector(
    (state) => state.users
  );
  const dispatch = useTypedDispatch();
  const moreButton = useRef<null | HTMLButtonElement>(null);

  async function getUsers(url: string | null) {
    if (users.length === 6) {
      // reload initial 6 users to avoid back problems
      await dispatch(fetchUsers(1));
    }
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
  }, [dispatch]);

  return (
    <Box component="section" className="container">
      <Box ref={ref} className={classes.container}>
        <Typography variant="h1" component="h2" marginBottom="50px">
          Working with GET request
        </Typography>

        {isLoading && <CircularProgress />}
        {error && <div>{error}</div>}
        <Grid
          container
          spacing={{ xs: '20px', sm: '16px', md: '29px', lg: '29px' }}
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
    </Box>
  );
});

export default CardsUsers;
