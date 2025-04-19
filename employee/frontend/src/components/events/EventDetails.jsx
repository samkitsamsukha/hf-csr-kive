import { formatEventDate, getCategoryColor, getCategoryIcon, formatCategoryName } from '../../services/api'

function EventDetails({ event }) {
  if (!event) return null
  
  const { 
    eventName, 
    eventDate, 
    eventDescription, 
    eventImage, 
    eventLocation, 
    eventCoins, 
    eventCategory,
    eventSummary 
  } = event
  
  const categoryColor = getCategoryColor(eventCategory)
  const categoryIcon = getCategoryIcon(eventCategory)
  
  return (
    <div className="animate-enter">
      <div className="rounded-lg overflow-hidden shadow-md mb-6">
        <div className="relative h-60 md:h-80">
          <img 
            src={eventImage}
            alt={eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <div className={`${categoryColor} self-start text-xs px-2 py-1 rounded-full font-semibold mb-3 flex items-center`}>
              <span className="mr-1">{categoryIcon}</span>
              {formatCategoryName(eventCategory)}
            </div>
            <h1 className="text-white text-2xl md:text-3xl font-bold">{eventName}</h1>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-gray-600 dark:text-gray-300 font-medium">{formatEventDate(eventDate)}</span>
          </div>
          
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-gray-600 dark:text-gray-300 font-medium">{eventLocation}</span>
          </div>
          
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full">
            <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 1.18.898 2.043 1.84 2.725.41.298.814.575 1.161.835.363.274.674.54.84.798V13a1 1 0 102 0v-.528c.638-.301 1.093-.567 1.464-.957C13.905 10.65 14 9.833 14 9c0-1.18-.898-2.043-1.84-2.725A7.983 7.983 0 0011 5.092V5z" />
            </svg>
            <span className="text-accent-600 font-semibold">{eventCoins} CSR Coins</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Event Summary</h3>
          <p className="text-gray-700 dark:text-gray-300">{eventSummary}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{eventDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetails