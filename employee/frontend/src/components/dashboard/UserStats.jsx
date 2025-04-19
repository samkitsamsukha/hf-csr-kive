import PropTypes from 'prop-types';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  LinearProgress, 
  useTheme 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const UserStats = ({ user, totalUsers }) => {
  const theme = useTheme();
  
  const stats = [
    { 
      id: 'coins', 
      label: 'Total Coins', 
      value: user.totalCoins, 
      icon: <AttachMoneyIcon sx={{ fontSize: 32, color: theme.palette.warning.main }} />,
      color: theme.palette.warning.main
    },
    { 
      id: 'events', 
      label: 'Events Participated', 
      value: user.events.length,
      icon: <VolunteerActivismIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      color: theme.palette.secondary.main
    },
    { 
      id: 'rank', 
      label: 'Current Rank', 
      value: `${user.leaderboardPosition} / ${totalUsers}`,
      icon: <EmojiEventsIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.main,
      progress: ((totalUsers - user.leaderboardPosition + 1) / totalUsers) * 100
    }
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
        Your CSR Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.id}>
            <Paper
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: `${stat.color}15`,
                border: `1px solid ${stat.color}30`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{ mr: 1.5 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
              
              {stat.progress && (
                <Box sx={{ mt: 'auto', width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.progress} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: `${stat.color}30`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color
                      }
                    }} 
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

UserStats.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organisation: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    totalCoins: PropTypes.number.isRequired,
    leaderboardPosition: PropTypes.number.isRequired
  }).isRequired,
  totalUsers: PropTypes.number.isRequired
};

export default UserStats;