import { useState, useEffect } from 'react';
// import { 
//   dashboardStats, 
//   getLeaderboard, 
//   getPastEvents,
//   getUpcomingEvents,
//   events
// } from '../data/mockData';
import StatCard from '../components/dashboard/StatCard';
// import EventParticipationChart from '../components/dashboard/EventParticipationChart';
// import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
// import LeaderboardWidget from '../components/dashboard/LeaderboardWidget';
// import RecentSubmissions from '../components/dashboard/RecentSubmissions';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {

  

  const [events, setEvents] = useState(null);
  // const [leaders, setLeaders] = useState([]);
  // const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http:localhost:4000/api/admin/events");
        setEvents(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    }
    fetchData();
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  // If data is still loading
  if (!events) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center">
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-4 max-w-md">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Events" 
            value={events.length} 
            icon={
              <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            color="primary"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Participants" 
            value={events.length} 
            icon={
              <svg className="h-6 w-6 text-secondary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            color="secondary"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Impact Coins Awarded" 
            value={events.length} 
            icon={
              <svg className="h-6 w-6 text-accent-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="accent"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {/* <StatCard 
            title="Upcoming Events" 
            value={upcomingEventsCount} 
            icon={
              <svg className="h-6 w-6 text-success-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="success"
          /> */}
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {/* <EventParticipationChart data={events.length} /> */}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {/* <CategoryBreakdown data={events.length} /> */}
        </motion.div>
      </motion.div>

      {/* Additional Widgets */}
      <motion.div 
        className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {/* <LeaderboardWidget leaders={leaders} /> */}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {/* <RecentSubmissions allEvents={events} /> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;