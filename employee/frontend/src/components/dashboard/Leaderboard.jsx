import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Avatar,
  Box,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { UserContext } from '../../context/UserContext';

const Leaderboard = ({ leaderboard }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useContext(UserContext);
  const [highlightedRow, setHighlightedRow] = useState(null);
  
  useEffect(() => {
    // Find the current user in the leaderboard
    const userPosition = leaderboard.findIndex(entry => entry.id === user.id);
    if (userPosition !== -1) {
      setHighlightedRow(userPosition);
      
      // Scroll to the user's position after a delay
      setTimeout(() => {
        const userRow = document.getElementById(`leaderboard-row-${userPosition}`);
        if (userRow) {
          userRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [leaderboard, user.id]);

  const getPositionColor = (position) => {
    switch (position) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return theme.palette.grey[300];
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <EmojiEventsIcon sx={{ mr: 1, color: '#FFD700' }} />
        <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
          CSR Leaderboard
        </Typography>
      </Box>
      
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table stickyHeader aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
              {!isMobile && <TableCell sx={{ fontWeight: 'bold' }}>Events</TableCell>}
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Coins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow 
                key={entry.id}
                id={`leaderboard-row-${index}`}
                sx={{ 
                  backgroundColor: entry.id === user.id ? theme.palette.primary.light + '40' : 'inherit',
                  '&:hover': {
                    backgroundColor: entry.id === user.id 
                      ? theme.palette.primary.light + '60'
                      : theme.palette.action.hover
                  }
                }}
              >
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: getPositionColor(entry.position),
                      color: entry.position <= 3 ? '#000' : '#fff',
                      fontWeight: 'bold'
                    }}
                  >
                    {entry.position}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        backgroundColor: entry.id === user.id 
                          ? theme.palette.primary.main
                          : theme.palette.grey[400]
                      }}
                    >
                      {entry.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: entry.id === user.id ? 'bold' : 'regular' }}>
                        {entry.name}
                        {entry.id === user.id && (
                          <Chip 
                            label="You" 
                            size="small" 
                            color="primary"
                            sx={{ ml: 1, height: 20, fontSize: '0.6rem' }}
                          />
                        )}
                      </Typography>
                      {!isMobile && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {entry.organisation}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    {entry.events}
                  </TableCell>
                )}
                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary.main">
                    {entry.totalCoins}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      organisation: PropTypes.string.isRequired,
      totalCoins: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      events: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Leaderboard;