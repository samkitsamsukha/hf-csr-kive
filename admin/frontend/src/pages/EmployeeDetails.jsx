import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import CategoryBadge from '../components/CategoryBadge'
import axios from 'axios'
import ProfileBadge from '../components/ProfileBadge'

function EmployeeDetails() {
  const { employeeId } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(employeeId);
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const empRes = await axios.get(`http://localhost:4000/api/admin/employees/${employeeId}`);
        console.log(empRes.data)
        setEmployee(empRes.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Failed to load employee details')
        setLoading(false)
      }
    }

    fetchEmployeeDetails()
  }, [employeeId])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/employees" className="btn btn-primary">Back to Employees</Link>
      </div>
    )
  }

  if (!employee) return null

  // Calculate total coins earned
  const totalCoins = employee.events.reduce((sum, event) => sum + event.eventCoins, 0)

  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <Link to="/employees" className="inline-flex items-center text-primary-700 hover:text-primary-800 mb-6">
        ← Back to Employees
      </Link>
      
      <div className="">
        {/* Employee details section */}
        <div className='flex flex-row gap-12'>
          <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center space-x-5 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold text-xl">
                  {employee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                  <p className="text-gray-600">{employee.organisation}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{employee.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">Total Coins</p>
                  <p className="font-medium text-accent-600">{totalCoins}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6 w-1/2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Badges</h2>
              {employee.events && employee.events.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {Array.from(new Set(employee.events.map(event => event.eventCategory))).map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center shadow-md rounded-md"
                    >
                      <ProfileBadge category={category} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No badges earned yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Participation History</h2>
              
              {employee.events && employee.events.length > 0 ? (
                <div className="space-y-4">
                  {employee.events.map((event, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{event.eventName}</h3>
                          <p className="text-sm text-gray-600">
                            {format(new Date(event.eventDate), 'MMMM d, yyyy')} • {event.eventLocation}
                          </p>
                          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{event.eventDescription}</p>
                        </div>
                        <div>
                          <span className="inline-block bg-accent-50 text-accent-600 text-sm font-medium px-2.5 py-1 rounded">
                            {event.eventCoins} coins
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <CategoryBadge category={event.eventCategory} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No participation history yet</p>
              )}
            </div>
          </div>
    </div>
  )
}

export default EmployeeDetails