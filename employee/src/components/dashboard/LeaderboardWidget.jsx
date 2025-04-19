import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LeaderboardWidget = ({ leaders }) => {
  // Only show top 5 leaders
  const topLeaders = leaders.slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
        <Link to="/leaderboard" className="text-sm font-medium text-primary-600 hover:text-primary-700">
          View all
        </Link>
      </div>
      <div className="border-t border-gray-200 divide-y divide-gray-200">
        {topLeaders.map((leader, index) => (
          <motion.div 
            key={leader.id}
            className="px-4 py-4 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.05)' }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="relative">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={leader.avatar} 
                    alt={leader.name}
                  />
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full ${
                      index === 0 ? 'bg-yellow-400' : 
                      index === 1 ? 'bg-gray-300' :
                      'bg-amber-600'
                    }`}>
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{leader.name}</p>
                <p className="text-sm text-gray-500 truncate">{leader.totalEvents} Events</p>
              </div>
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {leader.totalCoins} Coins
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {leaders.length === 0 && (
          <div className="px-4 py-6 sm:px-6 text-center text-gray-500">
            No leaderboard data available
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardWidget;