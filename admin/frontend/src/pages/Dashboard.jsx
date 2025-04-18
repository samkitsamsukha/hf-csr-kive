import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'
import { mockEvents } from '../data/mockData'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      try {
        setEvents(mockEvents)
        setLoading(false)
      } catch (err) {
        setError('Failed to load events')
        setLoading(false)
      }
    }, 800)
  }, [])

  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'environment', label: 'Environment' },
    { id: 'women_empowerment', label: 'Women Empowerment' },
  ]

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.eventCategory === activeFilter)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CSR Events</h2>
          <p className="text-gray-600">Browse all corporate social responsibility events</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === option.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card h-80 animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600">No events found for the selected category.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard