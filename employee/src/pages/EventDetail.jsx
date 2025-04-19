import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { EVENT_CATEGORIES } from '../data/mockData';
import ReportForm from '../components/events/ReportForm';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
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
      return url;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/admin/events/${id}`);
        setEvent(res.data);
        console.log(res.data)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    }
    fetchData();
  }, [id]);
  
  // Handle report submission
  const handleSubmitReport = (reportData) => {
    // Add the new submission to the event
    const updatedEvent = {
      ...event,
      submissions: [...event.submissions, reportData],
      participants: event.participants + 1,
    };
    
    setEvent(updatedEvent);
    setHasSubmitted(true);
    setShowReportForm(false);
  };
  
  // Get category name from ID
  const getCategoryName = (categoryId) => {
    const category = EVENT_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Get category color from ID
  const getCategoryColor = (categoryId) => {
    const category = EVENT_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : 'primary';
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Event not found</h3>
          <p className="mt-1 text-sm text-gray-500">The event youre looking for doesnt exist or has been removed.</p>
          <div className="mt-6">
            <Link to="/events" className="btn-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const categoryColor = getCategoryColor(event.eventCategory);
  const isUpcoming = new Date(event.eventDate) >= new Date();

  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link 
        to="/events" 
        className="inline-flex items-center mb-6 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Events
      </Link>
      
      {/* Event header */}
      <div className="relative rounded-lg overflow-hidden mb-6">
        <div className="absolute inset-0">
          <img 
            src={convertToRawGitHubURL(event.eventImage)} 
            alt={event.eventName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
        
        <div className="relative px-6 py-16 sm:py-24 lg:py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              {event.eventName}
            </h1>
            <p className="mt-4 text-xl text-white">
              {format(new Date(event.eventDate), 'MMMM d, yyyy')} • {event.eventLocation}
            </p>
            <div className="mt-6">
              <span className={`badge badge-${categoryColor} text-sm`}>
                {getCategoryName(event.eventCategory)}
              </span>
              
              {isUpcoming && (
                <span className="badge badge-primary ml-2 text-sm">
                  Upcoming
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Event details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-white rounded-lg shadow overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 mb-4">{event.eventDescription}</p>
              
              {event.eventSummary && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Event Summary</h3>
                  <p className="text-gray-700">{event.eventSummary}</p>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Participants section */}
          <motion.div 
            className="mt-8 bg-white rounded-lg shadow overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Participants</h2>
            </div>
            <div className="px-6 py-5">
              {event.submissions.length > 0 ? (
                <div className="space-y-6">
                  {event.submissions.map((submission) => (
                    <div key={submission.id} className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <img 
                          src={submission.picture} 
                          alt={submission.employeeName} 
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{submission.employeeName}</h4>
                        <p className="mt-1 text-gray-700 line-clamp-3">{submission.report}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No participants yet. Be the first to join!</p>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Event information */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Event Information</h2>
            </div>
            <div className="px-6 py-5">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="text-sm text-gray-900">
                    {format(new Date(event.eventDate), 'MMMM d, yyyy')}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900">{event.eventLocation}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">
                    {getCategoryName(event.eventCategory)}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Impact Coins</dt>
                  <dd className="text-sm text-gray-900 font-semibold">{event.eventCoins}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Participants</dt>
                  <dd className="text-sm text-gray-900">{event.participants}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Action card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5">
              {isUpcoming ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Join this event!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This is an upcoming event. Join to make an impact and earn {event.eventCoins} Impact Coins.
                  </p>
                  <motion.button
                    className="w-full btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Participate
                  </motion.button>
                </>
              ) : hasSubmitted ? (
                <>
                  <h3 className="text-lg font-medium text-success-600 mb-3">You've participated!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Thank you for your contribution. You have earned {event.eventCoins} Impact Coins.
                  </p>
                  <div className="bg-success-50 text-success-700 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-success-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">Your report has been submitted successfully!</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Submit your report</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Did you participate in this event? Submit your report and earn {event.eventCoins} Impact Coins.
                  </p>
                  <motion.button
                    className="w-full btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportForm(true)}
                  >
                    Submit Report
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Report submission form modal */}
      <AnimatePresence>
        {showReportForm && (
          <ReportForm 
            event={event} 
            onSubmit={handleSubmitReport} 
            onClose={() => setShowReportForm(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetail;