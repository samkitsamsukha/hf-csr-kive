import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchUserSubmissions, fetchLeaderboard } from '../services/api'
import StatsSummary from '../components/dashboard/StatsSummary'
import ReportHistory from '../components/dashboard/ReportHistory'
import Leaderboard from '../components/dashboard/Leaderboard'

function DashboardPage() {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [submissionsData, leaderboardData] = await Promise.all([
          fetchUserSubmissions(user.id),
          fetchLeaderboard()
        ])
        setSubmissions(submissionsData)
        setLeaderboard(leaderboardData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [user.id])
  
  // Calculate statistics
  const userRank = leaderboard.findIndex(item => item.id === user.id) + 1
  const stats = {
    eventsParticipated: submissions.length,
    totalCoins: submissions.reduce((total, submission) => total + submission.coins, 0),
    rank: userRank || '-',
    percentile: userRank ? Math.round((leaderboard.length - userRank) / leaderboard.length * 100) : 0
  }
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-200 mb-4"></div>
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-error-50 text-error-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your CSR participation and impact
        </p>
      </div>
      
      <StatsSummary stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Report History</h2>
          </div>
          <ReportHistory submissions={submissions} />
        </div>
        
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h2>
          </div>
          <Leaderboard leaderboard={leaderboard} userId={user.id} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage