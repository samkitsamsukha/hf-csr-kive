import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const ReportForm = ({ event, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    report: '',
    picture: '',
  });
  
  const [errors, setErrors] = useState({
    report: '',
    picture: '',
  });
  
  const convertToRawGitHubURL = (url) => {
		try {
			const githubPrefix = "https://github.com/";
			const rawPrefix = "https://raw.githubusercontent.com/";

			if (url.startsWith(githubPrefix)) {
				const parts = url.replace(githubPrefix, "").split("/");
				if (parts.length >= 5 && parts[2] === "blob") {
					const [username, repo, , branch, ...pathParts] = parts;
					return `${rawPrefix}${username}/${repo}/${branch}/${pathParts.join("/")}`;
				}
			}
			return url;
		} catch (error) {
			console.error("Error converting GitHub URL:", error);
			return url;
		}
	};

  const [imagePreview, setImagePreview] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form
    const newErrors = {};
    if (!formData.report.trim()) {
      newErrors.report = 'Report is required';
    }
    if (!formData.picture.trim()) {
      newErrors.picture = 'Image URL is required';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const employeeId = '6802665e09c6db38baa6739b';
    const employeeName = 'Samkit Samsukha';
  
    const payload = {
      employeeId,
      employeeName,
      report: formData.report,
      picture: formData.picture,
      eventId: event._id,
    };
  
    try {
      // Admin submission
      await fetch(`http://localhost:4000/api/admin/events/${event._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          employeeName,
          report: formData.report,
          picture: formData.picture,
        }),
      });
      
      console.log("payload for employee sub", payload)
      // Employee submission
      await fetch(`http://localhost:4000/api/employee/events/${event._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      // Optionally show success message
      alert("Report submitted successfully!");
  
      // Reset form
      setFormData({ report: '', picture: '' });
      setImagePreview('');
      onClose(); // Close the modal
  
      // Optionally notify parent component
      if (onSubmit) onSubmit(payload);
  
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again later.");
    }
  };
  
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Update image preview
    if (name === 'picture' && value) {
      setImagePreview(value);
    }
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Submit Event Report</h2>
                <p className="text-sm text-gray-500">Event: {event.eventName}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="report" className="form-label">
                    Your Report <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="report"
                    name="report"
                    value={formData.report}
                    onChange={handleChange}
                    rows="4"
                    className={`form-input ${errors.report ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Describe your experience and contribution..."
                  ></textarea>
                  {errors.report && <p className="form-error">{errors.report}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="picture" className="form-label">
                    Image URL <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="picture"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                    className={`form-input ${errors.picture ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Enter image URL"
                  />
                  {errors.picture && <p className="form-error">{errors.picture}</p>}
                </div>
                
                {imagePreview && (
                  <div className="mb-4">
                    <p className="form-label">Image Preview</p>
                    <div className="mt-1 relative aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={convertToRawGitHubURL(imagePreview)} 
                        alt="Preview" 
                        className="object-cover w-full h-40"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
ReportForm.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventName: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default ReportForm;