import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin");
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse space-y-4 max-w-xl mx-auto">
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-maroon-700">{data.name}</h1>
        <p className="mt-2 text-lg text-gray-600 italic">Empowering innovation with integrity</p>
      </motion.div>

      <motion.div 
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">🌟 Vision</h2>
        <p className="text-gray-600 leading-relaxed">{data.vision}</p>
      </motion.div>

      <motion.div 
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">🎯 Mission</h2>
        <p className="text-gray-600 leading-relaxed">{data.mission}</p>
      </motion.div>

      <motion.div 
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">📌 Objectives</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {data.objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;
