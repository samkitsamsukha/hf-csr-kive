import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for sidebar links
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-white">
        <Link to="/" className='flex justify-center items-center space-x-2'>
          <img
            className="h-8 w-auto"
            src={"https://raw.githubusercontent.com/samkitsamsukha/csr-kive/main/assets/logo.png"}
            alt={"Silverman Sachs Logo"}
          />
          <p className='text-xl font-semibold'>Silverman Sachs</p>
        </Link>
      </div>
      <motion.div 
        className="flex-1 flex flex-col mt-5 overflow-y-auto"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <nav className="px-2 space-y-1">
          <motion.div variants={itemVariants}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </NavLink>
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Events
            </NavLink>
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </NavLink>
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-200 text-black font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Leaderboard
            </NavLink>
          </motion.div>
        </nav>
      </motion.div>
      
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <div className='w-12 h-12 rounded-full bg-black text-white font-semibold flex justify-center items-center text-xl'>
                SS
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Samkit Samsukha
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                samkitsamsukha@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import PropTypes from 'prop-types';

Sidebar.propTypes = {
  mobile: PropTypes.bool,
};

export default Sidebar;