import { Avatar, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { IUser } from '../../store/ActionCreators/ActionCreators';
import classes from './CardUser.module.scss';

const CardUser = ({ user }: { user: IUser }) => {
  return (
    <Grid item xs={1} sm={4} md={4}>
      <Card sx={{ maxWidth: 370 }}>
        <CardContent className={classes.content}>
          <Avatar className={classes.avatar} alt={user.name} src={user.photo} />
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
          <Typography my="20px">{user.name}</Typography>
          <Typography>{user.position}</Typography>
          <Typography>{user.email}</Typography>
          <Typography>{user.phone}</Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardUser;
