import { createContext, useContext, useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';

const EventsContext = createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, []);

  const filterEventsByCategory = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.eventCategory === category));
    }
  };

  const addSubmissionToEvent = (eventId, submission) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, submissions: [...event.submissions, submission] } 
          : event
      )
    );
    
    setFilteredEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, submissions: [...event.submissions, submission] } 
          : event
      )
    );
  };

  const value = {
    events,
    filteredEvents,
    isLoading,
    error,
    activeFilter,
    filterEventsByCategory,
    addSubmissionToEvent
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}