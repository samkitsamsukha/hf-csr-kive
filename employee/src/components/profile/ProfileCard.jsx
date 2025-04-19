import PropTypes from 'prop-types';
import { EVENT_CATEGORIES } from '../../data/mockData';

const ProfileCard = ({ employee }) => {

  let coins = 0;
  for(let i = 0; i < employee.events.length; i++) {
    const event = employee.events[i];
    coins += event.eventCoins;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary-300 to-secondary-300 p-4">
      <div className="px-4 sm:px-6">
        <div className="flex flex-row items-center">
          <div className='bg-white font-semibold rounded-full border-4 border-white shadow-lg flex justify-center items-center w-20 h-20 text-4xl'>
            SS
          </div>
          <div className="ml-4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
            <p className="text-gray-600">{employee.organisation}</p>
          </div>
        </div>
      </div>
      </div>
      
      
      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Impact Ranking</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Level {Math.floor(coins/250) + 1}
              </span>
            </dd>
          </div>
          
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Interest Categories</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex flex-wrap gap-2">
                {employee.categories && employee.categories.length > 0 ? (
                  employee.categories.map(categoryId => {
                    const category = EVENT_CATEGORIES.find(cat => cat.id === categoryId);
                    const color = category ? category.color : 'primary';
                    const name = category ? category.name : categoryId;
                    
                    return (
                      <span 
                        key={categoryId}
                        className={`badge badge-${color}`}
                      >
                        {name}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-gray-500">No interests selected</span>
                )}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
ProfileCard.propTypes = {
  employee: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organisation: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    totalCoins: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        eventCoins: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProfileCard;