import { format } from "date-fns";
import { motion } from "framer-motion";
import { EVENT_CATEGORIES } from "../../data/mockData";
import PropTypes from "prop-types";

const ProfileEvents = ({ events }) => {
	const getCategoryName = (categoryId) => {
		const category = EVENT_CATEGORIES.find((cat) => cat.id === categoryId);
		return category ? category.name : categoryId;
	};

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
			return url;
		} catch (error) {
			console.error("Error converting GitHub URL:", error);
			return url;
		}
	};

	return (
		<div className="bg-white shadow rounded-lg overflow-hidden">
			<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
				<h3 className="text-lg font-medium text-gray-900">Your Events</h3>
				<p className="mt-1 text-sm text-gray-500">
					A list of events you have participated in
				</p>
			</div>

			<div className="divide-y divide-gray-200">
				{events && events.length > 0 ? (
					events.map((event, index) => {
						const firstSubmission = event.submissions?.[0];

						return (
							<motion.div
								key={event._id}
								className="px-4 py-4 sm:px-6 hover:bg-gray-50"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<div className="block">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-auto w-64 rounded-md overflow-hidden">
											{firstSubmission?.picture ? (
												<img
													src={convertToRawGitHubURL(firstSubmission.picture)}
													alt={event.eventName}
													className="h-full w-full object-cover"
												/>
											) : (
												<div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
													No Image
												</div>
											)}
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
												{firstSubmission?.eventReport || "No report submitted"}
											</div>
											<div>
												<button className="px-2 py-1 rounded-sm shadow-md bg-black text-white text-sm my-2">Post to LinkedIn</button>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						);
					})
				) : (
					<div className="px-4 py-6 text-center text-gray-500">
						You have not participated in any events yet.
					</div>
				)}
			</div>
		</div>
	);
};

ProfileEvents.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			eventName: PropTypes.string,
			eventDate: PropTypes.string,
			eventLocation: PropTypes.string,
			eventCategory: PropTypes.string,
			eventImage: PropTypes.string,
			eventCoins: PropTypes.number,
			submissions: PropTypes.array,
		})
	).isRequired,
};

export default ProfileEvents;
