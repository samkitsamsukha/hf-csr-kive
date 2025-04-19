import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EVENT_CATEGORIES } from "../../data/mockData";
import PropTypes from "prop-types";

const ProfileEvents = ({ events }) => {
	// Get category name from category ID
	const getCategoryName = (categoryId) => {
		const category = EVENT_CATEGORIES.find((cat) => cat.id === categoryId);
		return category ? category.name : categoryId;
	};

	console.log(events);

	return (
		<div className="bg-white shadow rounded-lg overflow-hidden">
			<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
				<h3 className="text-lg font-medium text-gray-900">Your Events</h3>
				<p className="mt-1 text-sm text-gray-500">
					A list of events youve participated in
				</p>
			</div>

			<div className="divide-y divide-gray-200">
				{events && events.length > 0 ? (
					events.map((event, index) => (
						<motion.div
							key={event._id}
							className="px-4 py-4 sm:px-6 hover:bg-gray-50"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Link to={`/events/${event._id}`} className="block">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
										<img
											src={event.eventImage}
											alt={event.eventName}
											className="h-full w-full object-cover"
										/>
									</div>
									<div className="ml-4 flex-1">
										<div className="text-sm font-medium text-gray-900">
											{event.eventName}
										</div>
										<div className="text-sm text-gray-500">
											{format(new Date(event.eventDate), "MMMM d, yyyy")} •{" "}
											{event.eventLocation}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											Category: {getCategoryName(event.eventCategory)}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											Report:{" "}
											{event.submissions[0]
												? event.submissions[0].eventReport
												: "No report submitted"}
										</div>
									</div>
									<div>
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
											{event.eventCoins} coins
										</span>
									</div>
								</div>
							</Link>
						</motion.div>
					))
				) : (
					<div className="px-4 py-6 text-center text-gray-500">
						You havent participated in any events yet.
					</div>
				)}
			</div>
		</div>
	);
};
ProfileEvents.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			eventName: PropTypes.string.isRequired,
			eventDate: PropTypes.string.isRequired,
			eventLocation: PropTypes.string.isRequired,
			eventCategory: PropTypes.string.isRequired,
			eventImage: PropTypes.string.isRequired,
			eventCoins: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default ProfileEvents;
