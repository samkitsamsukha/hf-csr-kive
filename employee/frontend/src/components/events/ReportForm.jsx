import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useEvents } from '../../context/EventsContext'
import { submitEventReport } from '../../services/api'

function ReportForm({ event, onSubmitSuccess }) {
  const { user, updateUserEvents } = useAuth()
  const { addSubmissionToEvent } = useEvents()
  
  const [report, setReport] = useState('')
  const [picture, setPicture] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!report.trim()) {
      newErrors.report = 'Report is required'
    }
    
    if (!picture.trim()) {
      newErrors.picture = 'Picture URL is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSuccessMessage('')
    
    try {
      const reportData = {
        employeeId: user.id,
        employeeName: user.name,
        report,
        picture,
      }
      
      const submission = await submitEventReport(event.id, reportData)
      
      // Update UI with new submission
      addSubmissionToEvent(event.id, submission)
      
      // Add event to user's events
      updateUserEvents({
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventDescription: event.eventDescription,
        eventImage: event.eventImage,
        eventLocation: event.eventLocation,
        eventCoins: event.eventCoins,
        eventCategory: event.eventCategory
      })
      
      // Reset form
      setReport('')
      setPicture('')
      setErrors({})
      setSuccessMessage('Your report has been submitted successfully!')
      
      if (onSubmitSuccess) {
        onSubmitSuccess(submission)
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to submit report. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 animate-enter">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Submit Event Report</h2>
      
      {successMessage && (
        <div className="bg-success-50 text-success-700 p-4 rounded-lg mb-6 animate-fade-in">
          <div className="flex">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="report" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Report <span className="text-error-500">*</span>
          </label>
          <textarea
            id="report"
            rows="6"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="textarea"
            placeholder="Describe your experience and contributions during the event..."
          ></textarea>
          {errors.report && (
            <p className="mt-1 text-sm text-error-500">{errors.report}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Picture URL <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            id="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="input"
            placeholder="Enter URL of your event picture"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Please provide a URL to an image that showcases your participation in the event.
          </p>
          {errors.picture && (
            <p className="mt-1 text-sm text-error-500">{errors.picture}</p>
          )}
        </div>
        
        {errors.submit && (
          <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-6">
            <p>{errors.submit}</p>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary w-full flex justify-center items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm