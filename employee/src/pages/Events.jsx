import { useState, useEffect } from 'react';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import { motion } from 'framer-motion';
import axios from 'axios';

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    time: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:4000/api/admin/events');
        setAllEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    let filtered = [...allEvents];
    if (filters.category) {
      filtered = filtered.filter(event => event.eventCategory === filters.category);
    }
    const today = new Date();
    if (filters.time === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.eventDate) >= today);
    } else if (filters.time === 'past') {
      filtered = filtered.filter(event => new Date(event.eventDate) < today);
    }

    setFilteredEvents(filtered);
  }, [filters, allEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters */}
      <EventFilters onFilterChange={setFilters} />

      {/* Error message */}
      {error && (
        <div className="text-red-600 text-center py-4">{error}</div>
      )}

      {/* Events Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse h-80 rounded-lg overflow-hidden shadow">
              <div className="bg-gray-300 h-48 w-full"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEvents.map(event => (
            <motion.div key={event._id} variants={itemVariants}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to find what youre looking for.</p>
          <div className="mt-6">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setFilters({ category: null, time: 'all' })}
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
