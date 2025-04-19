import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import EventList from '../components/events/EventList';
import EventCategoryFilter from '../components/events/EventCategoryFilter';
import mockEvents from '../data/mockEvents';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setEvents(mockEvents);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <EventCategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
      </Box>
      
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          Loading events...
        </Box>
      ) : (
        <EventList 
          events={events} 
          selectedCategory={selectedCategory} 
        />
      )}
    </Container>
  );
};

export default EventsPage;