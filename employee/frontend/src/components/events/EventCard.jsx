import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea, 
  Chip, 
  Box, 
  useTheme,
  Grow
} from '@mui/material';
import { format } from 'date-fns';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';

const EventCard = ({ event }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [elevated, setElevated] = useState(false);

  const formatCategoryName = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryColor = (category) => {
    return theme.palette.categories[category] || theme.palette.primary.main;
  };

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Grow in={true} timeout={500}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          transform: elevated ? 'scale(1.02)' : 'scale(1)',
          boxShadow: elevated ? 4 : 1
        }}
        onMouseEnter={() => setElevated(true)}
        onMouseLeave={() => setElevated(false)}
      >
        <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="180"
              image={event.eventImage}
              alt={event.eventName}
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
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {event.eventName}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
              <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                {format(new Date(event.eventDate), 'MMMM dd, yyyy')}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                {event.eventLocation}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
              {event.eventDescription.length > 120 
                ? `${event.eventDescription.substring(0, 120)}...` 
                : event.eventDescription}
            </Typography>
            
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <Chip 
                label={`${event.eventCoins} Coins`} 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 'bold' }} 
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    eventDescription: PropTypes.string.isRequired,
    eventImage: PropTypes.string.isRequired,
    eventLocation: PropTypes.string.isRequired,
    eventCoins: PropTypes.number.isRequired,
    eventCategory: PropTypes.string.isRequired
  }).isRequired
};

export default EventCard;