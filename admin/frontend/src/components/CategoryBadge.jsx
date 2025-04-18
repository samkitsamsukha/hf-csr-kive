function CategoryBadge({ category }) {
  const categoryMap = {
    education: { bg: 'bg-education', text: 'Education' },
    healthcare: { bg: 'bg-healthcare', text: 'Healthcare' },
    vocational_training: { bg: 'bg-vocational_training', text: 'Vocational Training' },
    environment: { bg: 'bg-environment', text: 'Environment' },
    women_empowerment: { bg: 'bg-women_empowerment', text: 'Women Empowerment' },
    elderly_support: { bg: 'bg-elderly_support', text: 'Elderly Support' },
    support_differently_abled: { bg: 'bg-support_differently_abled', text: 'Differently Abled Support' },
    disaster_relief: { bg: 'bg-disaster_relief', text: 'Disaster Relief' },
    animal_welfare: { bg: 'bg-animal_welfare', text: 'Animal Welfare' },
  }

  const categoryInfo = categoryMap[category] || { bg: 'bg-gray-600', text: category }

  return (
    <span className={`${categoryInfo.bg} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
      {categoryInfo.text}
    </span>
  )
}

export default CategoryBadge