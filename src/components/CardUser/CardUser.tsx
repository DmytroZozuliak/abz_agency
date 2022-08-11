import {
  Avatar,
  Card,
  CardContent,
  Grid,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import { IUser } from '../../interfaces/interfaces';
import classes from './CardUser.module.scss';

const CardUser = ({ user }: { user: IUser }) => {
  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      borderRadius: '4px',
      fontSize: '16px',
      lineHeight: '26px',
    },
  }));

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '344px',
            md: '282px',
            lg: '370px',
          },
        }}
      >
        <CardContent className={classes.content}>
          <Avatar sx={{ width: '70px', height: '70px' }} alt={user.name} src={user.photo} />
          <Typography my="20px">{user.name}</Typography>
          <Typography>{user.position}</Typography>
          <CustomTooltip
            title={
              <a href={`mailto:${user.email}`} style={{ color: 'white', textDecoration: 'none' }}>
                {user.email}
              </a>
            }
            placement="bottom"
          >
            <Typography sx={{ cursor: 'pointer' }}>{user.email}</Typography>
          </CustomTooltip>
          <Typography>{user.phone}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardUser;
