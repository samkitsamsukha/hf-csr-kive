import PropTypes from 'prop-types';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import EventCard from './EventCard';
import EventSearch from './EventSearch';
import { useState } from 'react';

const EventList = ({ events, selectedCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events by category and search term
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.eventCategory === selectedCategory;
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: isMobile ? 2 : 0,
            fontWeight: 'bold',
            color: theme.palette.text.primary
          }}
        >
          Upcoming Events
        </Typography>
        <EventSearch value={searchTerm} onChange={handleSearchChange} />
      </Box>

      {filteredEvents.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No events found. Try a different search or category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default EventList;