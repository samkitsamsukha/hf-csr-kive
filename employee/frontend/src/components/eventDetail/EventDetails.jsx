import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Grid, 
  Divider,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const EventDetails = ({ event }) => {
  const theme = useTheme();

  const formatCategoryName = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryColor = (category) => {
    return theme.palette.categories[category] || theme.palette.primary.main;
  };

  if (!event) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography>Loading event details...</Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box 
          component="img" 
          src={event.eventImage} 
          alt={event.eventName}
          sx={{
            width: '100%',
            borderRadius: 1,
            maxHeight: 300,
            objectFit: 'cover'
          }}
        />
        <Chip
          label={formatCategoryName(event.eventCategory)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: getCategoryColor(event.eventCategory),
            color: 'white',
            fontWeight: 'bold'
          }}
          icon={<CategoryIcon style={{ color: 'white' }} />}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {event.eventName}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {format(new Date(event.eventDate), 'MMMM dd, yyyy - h:mm a')}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {event.eventLocation}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalActivityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography 
                variant="body1" 
                sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
              >
                {event.eventCoins} Coins on completion
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          About This Event
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {event.eventDescription}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Event Summary
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {event.eventSummary}
        </Typography>
      </Box>
    </Paper>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventDescription: PropTypes.string,
    eventImage: PropTypes.string,
    eventLocation: PropTypes.string,
    eventCoins: PropTypes.number,
    eventCategory: PropTypes.string,
    eventSummary: PropTypes.string
  })
};

export default EventDetails;