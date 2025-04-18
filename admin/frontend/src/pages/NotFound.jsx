import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <h1 className="text-6xl font-bold text-primary-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound