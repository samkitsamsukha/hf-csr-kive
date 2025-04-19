import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ProfileStats = ({ employee }) => {

  let coins = 0;
  for(let i = 0; i < employee.events.length; i++) {
    const event = employee.events[i];
    coins += event.eventCoins;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <motion.div 
        className="bg-white shadow rounded-lg p-4 text-center"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-3xl font-bold text-primary-600">{coins}</div>
        <div className="text-sm font-medium text-gray-600">Total Impact Coins</div>
      </motion.div>
      
      <motion.div 
        className="bg-white shadow rounded-lg p-4 text-center"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-3xl font-bold text-secondary-600">{employee.events.length}</div>
        <div className="text-sm font-medium text-gray-600">Events Participated</div>
      </motion.div>
      
      <motion.div 
        className="bg-white shadow rounded-lg p-4 text-center"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-3xl font-bold text-accent-600">{employee.categories.length}</div>
        <div className="text-sm font-medium text-gray-600">Categories</div>
      </motion.div>
    </div>
  );
};
ProfileStats.propTypes = {
  employee: PropTypes.shape({
    events: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string.isRequired,
        eventCoins: PropTypes.number.isRequired,
      })
    ).isRequired,
    coins: PropTypes.number.isRequired,
    totalEvents: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
  }).isRequired,
};

export default ProfileStats;