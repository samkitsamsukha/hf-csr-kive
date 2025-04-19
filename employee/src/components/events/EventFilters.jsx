import { useState, useEffect } from 'react';
import { EVENT_CATEGORIES } from '../../data/mockData';
import { motion } from 'framer-motion';

const EventFilters = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      category: selectedCategory === 'all' ? null : selectedCategory,
      time: timeFilter,
    });
  }, [selectedCategory, timeFilter, onFilterChange]);
  
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          
          <button
            type="button"
            className="mt-2 sm:mt-0 text-sm text-primary-600 hover:text-primary-700 sm:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Collapse filters' : 'Expand filters'}
          </button>
        </div>
        
        <div className={`mt-4 ${expanded ? 'block' : 'hidden sm:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category-filter"
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {EVENT_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                id="time-filter"
                className="form-input"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {EVENT_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`badge ${
                  selectedCategory === category.id 
                    ? `bg-${category.color}-500 text-white` 
                    : `bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-200`
                } cursor-pointer`}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? 'all' : category.id)}
              >
                {category.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`badge ${
                selectedCategory === 'all' 
                  ? `bg-gray-500 text-white` 
                  : `bg-gray-100 text-gray-800 hover:bg-gray-200`
              } cursor-pointer`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;