import { useState, useEffect } from 'react'
import { useEvents } from '../context/EventsContext'
import EventCard from '../components/events/EventCard'
import CategoryFilter from '../components/events/CategoryFilter'

function EventsPage() {
  const { filteredEvents, isLoading, error, activeFilter, filterEventsByCategory } = useEvents()
  const [searchTerm, setSearchTerm] = useState('')
  const [displayedEvents, setDisplayedEvents] = useState([])
  
  // Apply search filter on top of category filter
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedEvents(filteredEvents)
    } else {
      const term = searchTerm.toLowerCase()
      setDisplayedEvents(
        filteredEvents.filter(event => 
          event.eventName.toLowerCase().includes(term) ||
          event.eventDescription.toLowerCase().includes(term) ||
          event.eventLocation.toLowerCase().includes(term)
        )
      )
    }
  }, [searchTerm, filteredEvents])
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-200 mb-4"></div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-error-50 text-error-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Events</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore and participate in corporate social responsibility events
        </p>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events by name, description or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <CategoryFilter activeFilter={activeFilter} onFilterChange={filterEventsByCategory} />
      
      {displayedEvents.length === 0 ? (
        <div className="text-center py-10">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No events found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Try changing your search terms or filter selection
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsPage