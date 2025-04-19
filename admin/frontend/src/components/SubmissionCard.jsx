import PropTypes from "prop-types";

function SubmissionCard({ submission }) {
	const { employeeName, report, picture } = submission;
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
		<div className="card p-4 mb-4 animate-fade-in">
			<div className="flex items-start space-x-3">
				<div className="flex flex-row">
					<div className="w-2/3 flex flex-col">
						<div className="flex flex-row gap-2 items-center">
							<div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg flex-row">
								{employeeName.charAt(0).toUpperCase()}
							</div>
							<div className="font-medium text-gray-900">{employeeName}</div>
						</div>
						<div>
							<p className="mt-2 text-gray-700">{report}</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center w-1/3">
						{picture && (
							<div className="mt-3">
								<img
									src={convertToRawGitHubURL(picture)}
									alt={`${employeeName}'s submission`}
									className="w-64 h-auto max-h-64 object-cover rounded-md"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

SubmissionCard.propTypes = {
	submission: PropTypes.shape({
		employeeName: PropTypes.string.isRequired,
		report: PropTypes.string.isRequired,
		picture: PropTypes.string,
	}).isRequired,
};

export default SubmissionCard;
