import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/events') return 'Events';
    if (path.startsWith('/events/')) return 'Event Details';
    if (path === '/profile') return 'My Profile';
    
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <motion.h1 
              className="ml-2 md:ml-0 text-xl font-semibold text-gray-900"
              key={location.pathname}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {getPageTitle()}
            </motion.h1>
          </div>
        </div>
      </div>
    </header>
  );
};
Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
