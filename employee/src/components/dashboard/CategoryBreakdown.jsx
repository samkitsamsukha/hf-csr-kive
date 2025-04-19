import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(...registerables);

const CategoryBreakdown = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Define colors for the chart
  const categoryColors = [
    'rgba(8, 145, 178, 0.8)',  // Primary
    'rgba(126, 34, 206, 0.8)', // Secondary
    'rgba(249, 115, 22, 0.8)', // Accent
    'rgba(34, 197, 94, 0.8)',  // Success
    'rgba(245, 158, 11, 0.8)', // Warning
    'rgba(239, 68, 68, 0.8)',  // Error
    'rgba(107, 114, 128, 0.8)', // Gray
    'rgba(30, 64, 175, 0.8)',   // Blue
    'rgba(190, 24, 93, 0.8)',   // Pink
  ];

  useEffect(() => {
    if (data) {
      // Filter out zero value categories
      const filteredData = data.filter(item => item.value > 0);
      
      setChartData({
        labels: filteredData.map(item => item.name),
        datasets: [
          {
            data: filteredData.map(item => item.value),
            backgroundColor: categoryColors.slice(0, filteredData.length),
            borderColor: 'white',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      });
    }
  }, [data]);

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${value} participants (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
    },
  };

  // If no data with value > 0, show message
  if (!data || data.filter(item => item.value > 0).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h3>
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">No category data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h3>
      <div className="h-60 relative">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryBreakdown;