import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { getCategoryColor } from '../../data/mockData';

const EventCard = ({ event }) => {
  const categoryColor = getCategoryColor(event.eventCategory);
  const isUpcoming = new Date(event.eventDate) >= new Date();
  
  // Convert category ID to display name
  const getCategoryName = (categoryId) => {
    return categoryId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link 
        to={`/events/${event.id}`} 
        className="block h-full card group"
      >
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-t-lg">
          <img 
            src={event.eventImage} 
            alt={event.eventName}
            className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          {isUpcoming && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Upcoming
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <div className={`badge badge-${categoryColor} mb-2`}>
              {getCategoryName(event.eventCategory)}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {event.eventName}
            </h3>
            
            <p className="text-sm text-gray-500 mb-2">
              {format(new Date(event.eventDate), 'MMMM d, yyyy')}
            </p>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {event.eventDescription}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-gray-500">{event.eventLocation}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-amber-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-gray-700">{event.eventCoins} coins</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;