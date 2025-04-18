import { NavLink } from 'react-router-dom'
import { 
  IoGridOutline, 
  IoAddCircleOutline, 
  IoPeopleOutline,
  IoCloseOutline
} from 'react-icons/io5'

function Sidebar({ isOpen, isMobile, closeSidebar }) {
  const navigationItems = [
    { name: 'Dashboard', to: '/', icon: IoGridOutline },
    { name: 'Create Event', to: '/create-event', icon: IoAddCircleOutline },
    { name: 'Employees', to: '/employees', icon: IoPeopleOutline },
  ]

  const handleLinkClick = () => {
    if (isMobile) {
      closeSidebar()
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-primary-800 text-white transform transition-transform duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Logo and close button (mobile only) */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl tracking-wide">CSR-Kive</span>
          </div>
          {isMobile && (
            <button onClick={closeSidebar} className="p-1">
              <IoCloseOutline size={24} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-700 text-white' 
                      : 'text-white/80 hover:bg-primary-700/80 hover:text-white'}
                  `}
                >
                  <item.icon size={20} />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary-700">
          <div className="text-sm text-white/80">
            &copy; {new Date().getFullYear()} CSR-Kive
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar