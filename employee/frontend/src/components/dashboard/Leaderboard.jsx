function Leaderboard({ leaderboard, userId }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="bg-primary-500 text-white py-3 px-4">
        <h3 className="text-lg font-semibold">CSR Leaderboard</h3>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {leaderboard.map((person, index) => {
          const isCurrentUser = person.id === userId
          
          return (
            <li 
              key={person.id}
              className={`px-4 py-3 transition-colors ${
                isCurrentUser 
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-750'
              }`}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  index < 3 
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {index + 1}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${
                        isCurrentUser 
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {person.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {person.eventsParticipated} events participated
                      </p>
                    </div>
                    
                    <div className="flex items-center text-accent-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 1.18.898 2.043 1.84 2.725.41.298.814.575 1.161.835.363.274.674.54.84.798V13a1 1 0 102 0v-.528c.638-.301 1.093-.567 1.464-.957C13.905 10.65 14 9.833 14 9c0-1.18-.898-2.043-1.84-2.725A7.983 7.983 0 0011 5.092V5z" />
                      </svg>
                      <span className="font-semibold">{person.totalCoins}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Leaderboard