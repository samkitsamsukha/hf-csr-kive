import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import CategoryBadge from '../components/CategoryBadge'
import SubmissionCard from '../components/SubmissionCard'
import { mockEvents } from '../data/mockData'

function EventDetails() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      try {
        const foundEvent = mockEvents.find(e => e._id === eventId)
        if (foundEvent) {
          setEvent(foundEvent)
        } else {
          setError('Event not found')
        }
        setLoading(false)
      } catch (err) {
        setError('Failed to load event details')
        setLoading(false)
      }
    }, 800)
  }, [eventId])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-20 bg-gray-200 rounded mb-6"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center text-primary-700 hover:text-primary-800 mb-6">
        ← Back to Dashboard
      </Link>
      
      {/* Event header */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
        <div className="h-64 relative">
          <img 
            src={event.eventImage || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <CategoryBadge category={event.eventCategory} />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.eventName}</h1>
              <p className="text-gray-600 mt-1">
                {format(new Date(event.eventDate), 'MMMM d, yyyy')} • {event.eventLocation}
              </p>
            </div>
            <div className="flex items-center bg-accent-50 text-accent-700 px-4 py-2 rounded-md">
              <span className="font-semibold text-lg">{event.eventCoins}</span>
              <span className="ml-1">participation coins</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{event.eventDescription}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Event Summary</h2>
            <p className="text-gray-700">{event.eventSummary}</p>
          </div>
        </div>
      </div>
      
      {/* Submissions section */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Employee Submissions
          {event.submissions && (
            <span className="ml-2 text-gray-500 font-normal">
              ({event.submissions.length})
            </span>
          )}
        </h2>
        
        {event.submissions && event.submissions.length > 0 ? (
          event.submissions.map((submission, index) => (
            <SubmissionCard key={index} submission={submission} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No submissions yet for this event.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails