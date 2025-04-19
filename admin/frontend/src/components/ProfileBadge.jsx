import education from '../../../../assets/profile_badges/education.png'
import healthcare from '../../../../assets/profile_badges/healthcare.png'
import vocational_training from '../../../../assets/profile_badges/vocational_training.png'
import environment from '../../../../assets/profile_badges/environment.png'
import women_empowerment from '../../../../assets/profile_badges/women_empowerment.png'
import elderly_support from '../../../../assets/profile_badges/elderly_support.png'
import support_differently_abled from '../../../../assets/profile_badges/support_differently_abled.png'
import disaster_relief from '../../../../assets/profile_badges/disaster_relief.png'
import animal_welfare from '../../../../assets/profile_badges/animal_welfare.png'
import PropTypes from 'prop-types'

function ProfileBadge({ category }) {
  const categoryMap = {
    education: { image: education },
    healthcare: { image: healthcare },
    vocational_training: { image: vocational_training },
    environment: { image: environment },
    women_empowerment: { image: women_empowerment },
    elderly_support: { image: elderly_support },
    support_differently_abled: { image: support_differently_abled },
    disaster_relief: { image: disaster_relief },
    animal_welfare: { image: animal_welfare },
  }

  const categoryInfo = categoryMap[category] || { image: null }

  return (
    <span className="inline-block">
      {categoryInfo.image ? (
        <img 
          src={categoryInfo.image} 
          alt={category} 
          className="w-[150px] rounded-md border-[1px] border-gray-200"
        />
      ) : (
        <span className="bg-gray-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {category}
        </span>
      )}
    </span>
  )
}
ProfileBadge.propTypes = {
  category: PropTypes.string.isRequired,
}

export default ProfileBadge