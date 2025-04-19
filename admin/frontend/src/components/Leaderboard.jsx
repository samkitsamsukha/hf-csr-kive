import PropTypes from 'prop-types';

function Leaderboard({ employees }) {
  // Sort employees by total coins in descending order
  const sortedEmployees = [...employees].sort((a, b) => {
    const aCoins = a.events.reduce((sum, event) => sum + event.eventCoins, 0)
    const bCoins = b.events.reduce((sum, event) => sum + event.eventCoins, 0)
    return bCoins - aCoins
  })

  return (
    <div className="card animate-slide-up">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
        <p className="text-sm text-gray-600">Based on participation coins earned</p>
      </div>
      
      <div className="p-2">
        {sortedEmployees.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {sortedEmployees.map((employee, index) => {
              const totalCoins = employee.events.reduce((sum, event) => sum + event.eventCoins, 0)
              
              return (
                <div 
                  key={employee._id} 
                  className={`flex items-center p-3 hover:bg-gray-50 transition-colors ${index < 3 ? 'font-medium' : ''}`}
                >
                  <div className={`
                    flex items-center justify-center h-7 w-7 rounded-full mr-3 text-white font-semibold text-sm
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-200 text-gray-700'}
                  `}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.organisation}</p>
                  </div>
                  
                  <div className="font-semibold text-accent-600">
                    {totalCoins} <span className="text-xs">coins</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            No employee data available
          </div>
        )}
      </div>
    </div>
  )
}

Leaderboard.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      organisation: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          eventCoins: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Leaderboard