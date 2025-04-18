import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CreateEvent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: new Date(),
    eventDescription: '',
    eventImage: '',
    eventLocation: '',
    eventCoins: 10,
    eventCategory: '',
    eventSummary: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'vocational_training', label: 'Vocational Training' },
    { value: 'environment', label: 'Environment' },
    { value: 'women_empowerment', label: 'Women Empowerment' },
    { value: 'elderly_support', label: 'Elderly Support' },
    { value: 'support_differently_abled', label: 'Support for Differently Abled' },
    { value: 'disaster_relief', label: 'Disaster Relief' },
    { value: 'animal_welfare', label: 'Animal Welfare' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      eventDate: date
    }))
    if (errors.eventDate) {
      setErrors(prev => ({ ...prev, eventDate: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    if (!formData.eventName.trim()) newErrors.eventName = 'Event name is required'
    if (!formData.eventDescription.trim()) newErrors.eventDescription = 'Description is required'
    if (!formData.eventLocation.trim()) newErrors.eventLocation = 'Location is required'
    if (!formData.eventCategory) newErrors.eventCategory = 'Category is required'
    if (!formData.eventSummary.trim()) newErrors.eventSummary = 'Summary is required'
    if (!formData.eventImage.trim()) newErrors.eventImage = 'Image URL is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    
    try {
      // In a real app, this would be an API call
      console.log('Submitting event:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard after successful creation
      navigate('/')
    } catch (error) {
      console.error('Error creating event:', error)
      setErrors({ submit: 'Failed to create event. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New CSR Event</h2>
        <p className="text-gray-600">Fill in the details to create a new corporate social responsibility event</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Name */}
            <div>
              <label htmlFor="eventName" className="form-label">Event Name *</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className={`form-input ${errors.eventName ? 'border-red-500' : ''}`}
                placeholder="Enter event name"
              />
              {errors.eventName && <p className="mt-1 text-red-500 text-sm">{errors.eventName}</p>}
            </div>
            
            {/* Event Date */}
            <div>
              <label htmlFor="eventDate" className="form-label">Event Date *</label>
              <DatePicker
                selected={formData.eventDate}
                onChange={handleDateChange}
                className={`form-input ${errors.eventDate ? 'border-red-500' : ''}`}
                dateFormat="MMMM d, yyyy"
                id="eventDate"
              />
              {errors.eventDate && <p className="mt-1 text-red-500 text-sm">{errors.eventDate}</p>}
            </div>
            
            {/* Event Location */}
            <div>
              <label htmlFor="eventLocation" className="form-label">Event Location *</label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                className={`form-input ${errors.eventLocation ? 'border-red-500' : ''}`}
                placeholder="Enter event location"
              />
              {errors.eventLocation && <p className="mt-1 text-red-500 text-sm">{errors.eventLocation}</p>}
            </div>
            
            {/* Event Category */}
            <div>
              <label htmlFor="eventCategory" className="form-label">Event Category *</label>
              <select
                id="eventCategory"
                name="eventCategory"
                value={formData.eventCategory}
                onChange={handleChange}
                className={`form-input ${errors.eventCategory ? 'border-red-500' : ''}`}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
              {errors.eventCategory && <p className="mt-1 text-red-500 text-sm">{errors.eventCategory}</p>}
            </div>
            
            {/* Event Coins */}
            <div>
              <label htmlFor="eventCoins" className="form-label">Participation Coins</label>
              <input
                type="number"
                id="eventCoins"
                name="eventCoins"
                value={formData.eventCoins}
                onChange={handleChange}
                min="1"
                max="100"
                className="form-input"
              />
              <p className="mt-1 text-sm text-gray-500">Coins awarded to participants</p>
            </div>
            
            {/* Event Image */}
            <div>
              <label htmlFor="eventImage" className="form-label">Event Image URL *</label>
              <input
                type="text"
                id="eventImage"
                name="eventImage"
                value={formData.eventImage}
                onChange={handleChange}
                className={`form-input ${errors.eventImage ? 'border-red-500' : ''}`}
                placeholder="Enter image URL"
              />
              {errors.eventImage && <p className="mt-1 text-red-500 text-sm">{errors.eventImage}</p>}
            </div>
            
            {/* Event Description */}
            <div className="md:col-span-2">
              <label htmlFor="eventDescription" className="form-label">Event Description *</label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                rows="3"
                className={`form-input ${errors.eventDescription ? 'border-red-500' : ''}`}
                placeholder="Describe the event"
              ></textarea>
              {errors.eventDescription && <p className="mt-1 text-red-500 text-sm">{errors.eventDescription}</p>}
            </div>
            
            {/* Event Summary */}
            <div className="md:col-span-2">
              <label htmlFor="eventSummary" className="form-label">Event Summary *</label>
              <textarea
                id="eventSummary"
                name="eventSummary"
                value={formData.eventSummary}
                onChange={handleChange}
                rows="5"
                className={`form-input ${errors.eventSummary ? 'border-red-500' : ''}`}
                placeholder="Provide a summary of the event goals, expected outcomes, etc."
              ></textarea>
              {errors.eventSummary && <p className="mt-1 text-red-500 text-sm">{errors.eventSummary}</p>}
            </div>
          </div>
          
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
              {errors.submit}
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent