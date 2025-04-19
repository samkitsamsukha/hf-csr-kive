import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const RecentSubmissions = ({ allEvents }) => {
  // Gather all submissions from all events
  const submissions = allEvents
    .flatMap(event => event.submissions.map(sub => ({
      ...sub, 
      eventId: event.id,
      eventName: event.eventName,
      eventCategory: event.eventCategory,
      submissionDate: sub.submissionDate || new Date(event.eventDate)
    })))
    .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
    .slice(0, 3); // Get only the 3 most recent
  
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Toggle submission modal
  const toggleModal = (submission) => {
    setSelectedSubmission(submission ? { ...submission } : null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
      </div>
      <div className="border-t border-gray-200 divide-y divide-gray-200">
        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <motion.div 
              key={submission.id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleModal(submission)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                  <img src={submission.picture} alt="Report" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">{submission.employeeName}</div>
                  <div className="text-sm text-gray-500">
                    <Link to={`/events/${submission.eventId}`} className="hover:text-primary-600">
                      {submission.eventName}
                    </Link>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(submission.submissionDate), 'MMM d, yyyy')}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="px-4 py-5 text-center text-gray-500">
            No submissions yet
          </div>
        )}
      </div>
      
      {/* Submission Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => toggleModal(null)}
              />
              
              <motion.div 
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div>
                  <div className="mt-2">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{selectedSubmission.eventName}</h3>
                      <p className="text-sm text-gray-500">Submitted by {selectedSubmission.employeeName}</p>
                    </div>
                    
                    <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                      <img src={selectedSubmission.picture} alt="Report" className="w-full h-64 object-cover rounded-lg" />
                    </div>
                    
                    <p className="text-gray-700">{selectedSubmission.report}</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                    onClick={() => toggleModal(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentSubmissions;