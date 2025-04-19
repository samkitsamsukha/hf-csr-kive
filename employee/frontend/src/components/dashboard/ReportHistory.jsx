import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip, 
  IconButton, 
  Collapse,
  useTheme 
} from '@mui/material';
import { format } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EventIcon from '@mui/icons-material/Event';

const ReportHistory = ({ submissions }) => {
  const theme = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
        Your Submission History
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      {submissions.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <EventIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            You haven't submitted any event reports yet.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Participate in events and submit reports to see them here.
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {submissions.map((submission) => (
            <Box key={submission.id} sx={{ mb: 2 }}>
              <ListItem 
                alignItems="flex-start" 
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={() => handleToggleExpand(submission.id)}
                    sx={{ transform: expandedId === submission.id ? 'rotate(180deg)' : 'none' }}
                  >
                    {expandedId === submission.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                }
                sx={{ 
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    variant="rounded"
                    src={submission.picture} 
                    alt={submission.eventName}
                    sx={{ width: 56, height: 56, mr: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {submission.eventName}
                      </Typography>
                      <Chip 
                        label={`+${submission.coinsEarned} Coins`} 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </Box>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Submitted on {format(new Date(submission.submissionDate), 'MMMM dd, yyyy')}
                    </Typography>
                  }
                />
              </ListItem>
              
              <Collapse in={expandedId === submission.id} timeout="auto" unmountOnExit>
                <Box sx={{ 
                  px: 3, 
                  py: 2, 
                  ml: 9, 
                  mt: -0.5,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  backgroundColor: theme.palette.grey[50],
                  borderTop: `1px solid ${theme.palette.divider}`
                }}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {submission.report}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

ReportHistory.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      eventId: PropTypes.string.isRequired,
      eventName: PropTypes.string.isRequired,
      submissionDate: PropTypes.string.isRequired,
      report: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      coinsEarned: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ReportHistory;