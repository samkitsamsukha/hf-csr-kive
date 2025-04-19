import { getCategoryIcon, formatCategoryName } from '../../services/api'

function CategoryFilter({ activeFilter, onFilterChange }) {
  const categories = [
    'all',
    'education',
    'healthcare',
    'vocational_training',
    'environment',
    'women_empowerment',
    'elderly_support',
    'support_differently_abled',
    'disaster_relief',
    'animal_welfare'
  ]
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Event Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center ${
              activeFilter === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category !== 'all' && <span className="mr-1">{getCategoryIcon(category)}</span>}
            {category === 'all' ? 'All Events' : formatCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter