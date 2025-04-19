import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import CategoryBadge from './CategoryBadge'

function EventCard({ event }) {
  const { _id, eventName, eventDate, eventDescription, eventImage, eventLocation, eventCoins, eventCategory } = event
  
  const convertToRawGitHubURL = (url) => {
    try {
      const githubPrefix = "https://github.com/";
      const rawPrefix = "https://raw.githubusercontent.com/";
  
      if (url.startsWith(githubPrefix)) {
        const parts = url.replace(githubPrefix, "").split("/");
        if (parts.length >= 5 && parts[2] === "blob") {
          const [username, repo, , branch, ...pathParts] = parts;
          return `${rawPrefix}${username}/${repo}/${branch}/${pathParts.join(
            "/"
          )}`;
        }
      }
      return url; // Return the original URL if it's not a valid GitHub link
    } catch (error) {
      console.error("Error converting GitHub URL:", error);
      return url;
    }
  };


  return (
    <Link 
      to={`/events/${_id}`} 
      className="block animate-fade-in"
    >
      <div className="card overflow-hidden hover:translate-y-[-4px]">
        <div className="h-48 overflow-hidden relative">
          <div className="absolute top-3 right-3 z-10">
            <CategoryBadge category={eventCategory} />
          </div>
          <img 
            src={convertToRawGitHubURL(eventImage) || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
            alt={eventName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{eventName}</h3>
            <div className="flex items-center text-accent-600 font-medium">
              <span>{eventCoins}</span>
              <span className="ml-1 text-sm">coins</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium">Date:</span>
              <span className="ml-2">{format(new Date(eventDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-medium">Location:</span>
              <span className="ml-2 truncate">{eventLocation}</span>
            </div>
          </div>
          
          <p className="mt-3 text-gray-700 line-clamp-2">
            {eventDescription}
          </p>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-primary-700 text-sm font-medium">View details</span>
            {event.submissions && (
              <span className="text-sm text-gray-600">
                {event.submissions.length} {event.submissions.length === 1 ? 'submission' : 'submissions'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard