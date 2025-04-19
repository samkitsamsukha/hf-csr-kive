function SubmissionCard({ submission }) {
  const { employeeName, report, picture } = submission
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
      return url;
    }
  };
  return (
    <div className="card p-4 mb-4 animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold text-lg">
          {employeeName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{employeeName}</h4>
          <p className="mt-2 text-gray-700">{report}</p>
          
          {picture && (
            <div className="mt-3">
              <img 
                src={convertToRawGitHubURL(picture)} 
                alt={`${employeeName}'s submission`} 
                className="w-full h-auto max-h-64 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubmissionCard