import { useState, useEffect } from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileEvents from '../components/profile/ProfileEvents';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/employees/6803da26bf873e1982ad9f1e");
        setEmployee(res.data);
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }
    fetchData();
  }, []);

  
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-300 rounded-lg mb-6"></div>
          <div className="flex items-end -mt-16 mb-6">
            <div className="h-24 w-24 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-64 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!employee) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading profile</h3>
          <p className="mt-1 text-gray-500">Could not load employee profile data.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileCard employee={employee} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <ProfileStats employee={employee} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <ProfileEvents events={employee.events} />
      </motion.div>
    </div>
  );
};

export default Profile;