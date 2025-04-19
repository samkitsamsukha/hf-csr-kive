import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'

function App() {
  const { login } = useAuth()
  
  // Auto login with mock user for demonstration
  useEffect(() => {
    login({
      id: '123456',
      name: 'John Doe',
      email: 'john.doe@company.com',
      organisation: 'ABC Corp',
      events: [],
      categories: ['education', 'environment']
    })
  }, [login])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<EventsPage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App