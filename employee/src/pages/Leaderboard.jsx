import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/employees");
        const sorted = res.data.sort((a, b) => b.totalCoins - a.totalCoins);
        setLeaders(sorted);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const getCoinCount = (events) => {
    return events.reduce((total, event) => total + event.coins, 0);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Employee Impact Leaderboard</h2>
          <p className="mt-1 text-sm text-gray-500">Recognizing our top contributors to CSR initiatives</p>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-4 sm:px-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div>
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : leaders.length > 0 ? (
          <div>

            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row justify-around items-center mb-8 space-y-8 sm:space-y-0">

                {leaders.length > 1 && (
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative mb-2">
                      <div className='w-24 h-24 rounded-full flex justify-center items-center border-[4px] text-3xl font-semibold border-gray-300'>
                        {getInitials(leaders[1].name)}
                      </div>
                      <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-300">
                        <span className="text-lg font-bold text-white">2</span>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{leaders[1].name}</span>
                    <span className="text-gray-600">{leaders[1].totalCoins} Coins</span>
                  </motion.div>
                )}
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative mb-2">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <svg className="h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className='w-24 h-24 rounded-full flex justify-center items-center border-[4px] text-3xl font-semibold border-yellow-300'>
                        {getInitials(leaders[0].name)}
                      </div>
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400">
                      <span className="text-lg font-bold text-white">1</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{leaders[0].name}</span>
                  <span className="text-gray-600 font-semibold">{leaders[0].totalCoins} Coins</span>
                </motion.div>
                
                {leaders.length > 2 && (
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative mb-2">
                    <div className='w-24 h-24 rounded-full flex justify-center items-center border-[4px] text-3xl font-semibold border-orange-500'>
                        {getInitials(leaders[2].name)}
                      </div>
                      <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-amber-600">
                        <span className="text-lg font-bold text-white">3</span>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{leaders[2].name}</span>
                    <span className="text-gray-600">{leaders[2].totalCoins} Coins</span>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact Coins
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaders.slice(3).map((employee, index) => (
                    <motion.tr 
                      key={employee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                      whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.05)' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 4}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <div className='w-8 h-8 text-white bg-black rounded-full flex justify-center items-center  font-semibold'>
                        {getInitials(employee.name)}
                      </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.events.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                        {getCoinCount(employee.events)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="px-4 py-5 sm:px-6 text-center">
            <p className="text-gray-500">No leaderboard data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;