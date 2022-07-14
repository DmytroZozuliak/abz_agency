import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { IUser } from '../../store/ActionCreators/ActionCreators';
import classes from './CardUser.module.scss';

const CardUser = ({ user }: { user: IUser }) => {
  return (
    <Grid item xs={1} sm={4} md={4}>
      <Card sx={{ maxWidth: 370 }}>
        <CardContent className={classes.content}>
          <Avatar sx={{ width: '70px', height: '70px' }} alt={user.name} src={user.photo} />
          <Typography my="20px">{user.name}</Typography>
          <Typography>{user.position}</Typography>
          <Typography>{user.email}</Typography>
          <Typography>{user.phone}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardUser;
