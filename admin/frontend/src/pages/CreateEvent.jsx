import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateEvent() {

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		eventName: "",
		eventDate: new Date(),
		eventDescription: "",
		eventImage: "",
		eventLocation: "",
		eventCoins: 10,
		eventCategory: "",
		eventSummary: "",
	});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const categories = [
		{ value: "", label: "Select a category" },
		{ value: "education", label: "Education" },
		{ value: "healthcare", label: "Healthcare" },
		{ value: "vocational_training", label: "Vocational Training" },
		{ value: "environment", label: "Environment" },
		{ value: "women_empowerment", label: "Women Empowerment" },
		{ value: "elderly_support", label: "Elderly Support" },
		{
			value: "support_differently_abled",
			label: "Support for Differently Abled",
		},
		{ value: "disaster_relief", label: "Disaster Relief" },
		{ value: "animal_welfare", label: "Animal Welfare" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when field is being edited
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: null }));
		}
	};

	const handleDateChange = (date) => {
		setFormData((prev) => ({
			...prev,
			eventDate: date,
		}));
		if (errors.eventDate) {
			setErrors((prev) => ({ ...prev, eventDate: null }));
		}
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.eventName.trim())
      newErrors.eventName = "Event name is required";
    if (!formData.eventDescription.trim())
      newErrors.eventDescription = "Description is required";
    if (!formData.eventLocation.trim())
      newErrors.eventLocation = "Location is required";
    if (!formData.eventCategory)
      newErrors.eventCategory = "Category is required";
    if (!formData.eventSummary.trim())
      newErrors.eventSummary = "Summary is required";
    if (!formData.eventImage.trim())
      newErrors.eventImage = "Image URL is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setSubmitting(true);
  
    try {
      const payload = {
        adminId: "6802626ee952170c2291b435", // ✅ hardcoded admin ID
        eventData: {
          ...formData,
          eventDate: formData.eventDate?.toISOString() || new Date().toISOString(), // ✅ make sure it's a valid ISO date string
        },
      };
  
      console.log("Sending payload:", payload);
  
      const response = await axios.post(
        "http://localhost:4000/api/admin/events",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Event created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("API error:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to create event. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  

	return (
		<div className="animate-fade-in px-4 sm:px-8 lg:px-20 py-8">
			<div className="mb-8">
				<h2 className="text-3xl font-semibold text-gray-900">
					Create New CSR Event
				</h2>
				<p className="mt-1 text-gray-600 text-sm">
					Fill in the details to organize a new corporate social responsibility
					event.
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-md p-8">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Event Name */}
						<div>
							<label
								htmlFor="eventName"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Name *
							</label>
							<input
								type="text"
								id="eventName"
								name="eventName"
								value={formData.eventName}
								onChange={handleChange}
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white bg-white ${
									errors.eventName ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Enter event name"
							/>
							{errors.eventName && (
								<p className="mt-1 text-red-500 text-sm">{errors.eventName}</p>
							)}
						</div>

						{/* Event Date */}
						<div>
							<label
								htmlFor="eventDate"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Date *
							</label>
							<DatePicker
								selected={formData.eventDate}
								onChange={handleDateChange}
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventDate ? "border-red-500" : "border-gray-300"
								}`}
								dateFormat="MMMM d, yyyy"
								id="eventDate"
							/>
							{errors.eventDate && (
								<p className="mt-1 text-red-500 text-sm">{errors.eventDate}</p>
							)}
						</div>

						{/* Event Location */}
						<div>
							<label
								htmlFor="eventLocation"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Location *
							</label>
							<input
								type="text"
								id="eventLocation"
								name="eventLocation"
								value={formData.eventLocation}
								onChange={handleChange}
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventLocation ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Enter event location"
							/>
							{errors.eventLocation && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.eventLocation}
								</p>
							)}
						</div>

						{/* Event Category */}
						<div>
							<label
								htmlFor="eventCategory"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Category *
							</label>
							<select
								id="eventCategory"
								name="eventCategory"
								value={formData.eventCategory}
								onChange={handleChange}
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventCategory ? "border-red-500" : "border-gray-300"
								}`}
							>
								{categories.map((category) => (
									<option key={category.value} value={category.value}>
										{category.label}
									</option>
								))}
							</select>
							{errors.eventCategory && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.eventCategory}
								</p>
							)}
						</div>

						{/* Event Coins */}
						<div>
							<label
								htmlFor="eventCoins"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Participation Coins
							</label>
							<input
								type="number"
								id="eventCoins"
								name="eventCoins"
								value={formData.eventCoins}
								onChange={handleChange}
								min="1"
								max="100"
								className="w-full px-4 py-2 rounded-md border border-gray-300 transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
							/>
							<p className="mt-1 text-sm text-gray-500">
								Coins awarded to participants
							</p>
						</div>

						{/* Event Image */}
						<div>
							<label
								htmlFor="eventImage"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Image URL *
							</label>
							<input
								type="text"
								id="eventImage"
								name="eventImage"
								value={formData.eventImage}
								onChange={handleChange}
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventImage ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Enter image URL"
							/>
							{errors.eventImage && (
								<p className="mt-1 text-red-500 text-sm">{errors.eventImage}</p>
							)}
						</div>

						{/* Description */}
						<div className="md:col-span-2">
							<label
								htmlFor="eventDescription"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Description *
							</label>
							<textarea
								id="eventDescription"
								name="eventDescription"
								value={formData.eventDescription}
								onChange={handleChange}
								rows="3"
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventDescription ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Describe the event"
							/>
							{errors.eventDescription && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.eventDescription}
								</p>
							)}
						</div>

						{/* Summary */}
						<div className="md:col-span-2">
							<label
								htmlFor="eventSummary"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Event Summary *
							</label>
							<textarea
								id="eventSummary"
								name="eventSummary"
								value={formData.eventSummary}
								onChange={handleChange}
								rows="5"
								className={`w-full px-4 py-2 rounded-md border transition focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
									errors.eventSummary ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Summarize the goals and expected outcomes"
							/>
							{errors.eventSummary && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.eventSummary}
								</p>
							)}
						</div>
					</div>

					{/* Submit Error */}
					{errors.submit && (
						<div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md">
							{errors.submit}
						</div>
					)}

					{/* Buttons */}
					<div className="mt-8 flex justify-end space-x-4">
						<button
							type="button"
							onClick={() => navigate("/")}
							className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
							disabled={submitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
							disabled={submitting}
						>
							{submitting ? "Creating..." : "Create Event"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateEvent;
