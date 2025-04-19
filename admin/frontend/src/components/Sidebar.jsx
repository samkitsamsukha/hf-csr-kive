import { NavLink } from 'react-router-dom'
import { 
  IoGridOutline, 
  IoAddCircleOutline, 
  IoPeopleOutline,
  IoCloseOutline
} from 'react-icons/io5'

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Sidebar({ isOpen, isMobile, closeSidebar }) {
  const navigationItems = [
    { name: 'Dashboard', to: '/', icon: IoGridOutline },
    { name: 'Create Event', to: '/create-event', icon: IoAddCircleOutline },
    { name: 'Employees', to: '/employees', icon: IoPeopleOutline },
  ]

  const convertToRawGitHubURL = (url) => {
    try {
      const githubPrefix = "https://github.com/";
      const rawPrefix = "https://raw.githubusercontent.com/";
  
      if (url.startsWith(githubPrefix)) {
        const parts = url.replace(githubPrefix, "").split("/");
        if (parts.length >= 5 && parts[2] === "blob") {
          const [username, repo, , branch, ...pathParts] = parts;
          return `${rawPrefix}${username}/${repo}/${branch}/${pathParts.join(
            "/"
          )}`;
        }
      }
      return url; // Return the original URL if it's not a valid GitHub link
    } catch (error) {
      console.error("Error converting GitHub URL:", error);
      return url;
    }
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get('http://localhost:4000/api/admin/');
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    }
    fetchData();
  }, []);

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
          w-64 bg-white text-black transform transition-transform duration-300 ease-in-out
          flex flex-col border-r border-gray-300
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
                      ? 'bg-gray-300 text-black' 
                      : 'hover:bg-gray-200 hover:text-black'}
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
        <div className="p-4 border-t border-gray-300">
          {data && <div className="text-sm text-black flex flex-col justify-center gap-3">
            <div className='flex items-center  gap-3'>
              <img src={convertToRawGitHubURL(data.logoUrl)} alt="logo" className='w-8'/>
              <p className='text-xl font-semibold'>{data.name}</p>
            </div>
            <div>
              <p className='text-sm text-gray-700 font-semibold'>Admin Details</p>
              <p className='text-sm text-gray-700'>{data.adminName}</p>
              <p className='text-sm text-gray-700'>{data.adminEmail}</p>
            </div>
          </div>}
        </div>
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar