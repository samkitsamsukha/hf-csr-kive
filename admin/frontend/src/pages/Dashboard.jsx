import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/admin/events');
        setEvents(res.data);
        setLoading(false);
        console.log(res.data)
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
        console.error(err);
        console.log('Error fetching events:', err);
      }
    };
  
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CSR Events</h2>
          <p className="text-gray-600">Browse all corporate social responsibility events</p>
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
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Link key={event._id} to={`/events/${event._id}`}>
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600">No events found.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard