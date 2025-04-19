import { Link } from 'react-router-dom'
import { formatEventDate, getCategoryColor, formatCategoryName } from '../../services/api'

function EventCard({ event }) {
  const { id, eventName, eventDate, eventImage, eventLocation, eventCoins, eventCategory } = event
  const categoryColor = getCategoryColor(eventCategory)
  
  return (
    <Link 
      to={`/event/${id}`}
      className="card group hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={eventImage} 
          alt={eventName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <div className={`${categoryColor} text-xs px-2 py-1 rounded-full font-semibold`}>
            {formatCategoryName(eventCategory)}
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">{eventName}</h3>
          <div className="flex items-center text-accent-600">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 1.18.898 2.043 1.84 2.725.41.298.814.575 1.161.835.363.274.674.54.84.798V13a1 1 0 102 0v-.528c.638-.301 1.093-.567 1.464-.957C13.905 10.65 14 9.833 14 9c0-1.18-.898-2.043-1.84-2.725A7.983 7.983 0 0011 5.092V5z" />
            </svg>
            <span className="font-semibold">{eventCoins}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{formatEventDate(eventDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{eventLocation}</span>
        </div>
        
        <div className="mt-auto pt-4">
          <div className="btn btn-primary w-full">View Event</div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard