function StatsSummary({ stats }) {
  const { eventsParticipated, totalCoins, rank, percentile } = stats
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center animate-enter">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Events Participated</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{eventsParticipated}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center animate-enter" style={{ animationDelay: '100ms' }}>
        <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 1.18.898 2.043 1.84 2.725.41.298.814.575 1.161.835.363.274.674.54.84.798V13a1 1 0 102 0v-.528c.638-.301 1.093-.567 1.464-.957C13.905 10.65 14 9.833 14 9c0-1.18-.898-2.043-1.84-2.725A7.983 7.983 0 0011 5.092V5z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total CSR Coins</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCoins}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center animate-enter" style={{ animationDelay: '200ms' }}>
        <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-secondary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Rank</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">#{rank}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center animate-enter" style={{ animationDelay: '300ms' }}>
        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Top Percentile</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{percentile}%</p>
        </div>
      </div>
    </div>
  )
}

export default StatsSummary