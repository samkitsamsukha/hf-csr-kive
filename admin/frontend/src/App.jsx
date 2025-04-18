import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import Employees from './pages/Employees'
import EventDetails from './pages/EventDetails'
import EmployeeDetails from './pages/EmployeeDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="employees" element={<Employees />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App