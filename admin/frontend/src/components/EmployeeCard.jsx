import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function EmployeeCard({ employee }) {
  const { _id, name, organisation, email, events } = employee
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };


  const totalCoins = events ? events.reduce((sum, event) => sum + event.eventCoins, 0) : 0
  
  return (
    <Link 
      to={`/employees/${_id}`}
      className="block animate-fade-in"
    >
      <div className="card p-5 hover:translate-y-[-4px]">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
            {getInitials(name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
            <p className="text-sm text-gray-600 truncate">{organisation}</p>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-4">
          <div>
            <span className="text-sm text-gray-600">Events participated</span>
            <p className="font-semibold text-gray-900">{events ? events.length : 0}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Coins earned</span>
            <p className="font-semibold text-accent-600">{totalCoins}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organisation: PropTypes.string,
    email: PropTypes.string,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        eventCoins: PropTypes.number
      })
    )
  }).isRequired
};

export default EmployeeCard
