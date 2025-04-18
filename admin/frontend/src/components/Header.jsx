import { IoMenuOutline } from 'react-icons/io5'

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-800 hover:bg-gray-100"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <IoMenuOutline size={24} />
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">
            CSR Activities Archive
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Right header content goes here - could include user profile, notifications, etc. */}
        </div>
      </div>
    </header>
  )
}

export default Header