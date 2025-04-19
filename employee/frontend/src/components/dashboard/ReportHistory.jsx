import { useState } from 'react'
import { formatEventDate } from '../../services/api'

function ReportHistory({ submissions }) {
  const [selectedReport, setSelectedReport] = useState(null)
  
  const handleReportClick = (report) => {
    setSelectedReport(selectedReport?.id === report.id ? null : report)
  }
  
  if (!submissions || submissions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Reports Yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          You haven't submitted any event reports yet.
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {submissions.map((report) => (
          <li key={report.id} className="animate-enter">
            <div 
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${
                selectedReport?.id === report.id ? 'bg-gray-50 dark:bg-gray-750' : ''
              }`}
              onClick={() => handleReportClick(report)}
            >
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={report.eventImage} 
                    alt={report.eventName}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {report.eventName}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatEventDate(report.submittedAt)}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                    {report.report}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-accent-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 1.18.898 2.043 1.84 2.725.41.298.814.575 1.161.835.363.274.674.54.84.798V13a1 1 0 102 0v-.528c.638-.301 1.093-.567 1.464-.957C13.905 10.65 14 9.833 14 9c0-1.18-.898-2.043-1.84-2.725A7.983 7.983 0 0011 5.092V5z" />
                      </svg>
                      <span className="font-semibold">{report.coins}</span>
                    </div>
                    
                    <span className="ml-4 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {formatEventDate(report.eventDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Expanded report details */}
              {selectedReport?.id === report.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report</h4>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{report.report}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Submitted Image</h4>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={report.picture} 
                        alt="Event submission" 
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReportHistory