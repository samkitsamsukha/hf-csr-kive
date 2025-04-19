import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(...registerables);

const EventParticipationChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Colors for the chart
  const getGradient = (ctx, chartArea) => {
    if (!ctx || !chartArea) {
      return null;
    }
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(8, 145, 178, 0.2)');
    gradient.addColorStop(1, 'rgba(8, 145, 178, 0.8)');
    return gradient;
  };

  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.map(item => item.month),
        datasets: [
          {
            label: 'Participants',
            data: data.map(item => item.participants),
            backgroundColor: function(context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              return getGradient(ctx, chartArea);
            },
            borderColor: 'rgba(8, 145, 178, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 12,
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
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: 'rgba(8, 145, 178, 0.3)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Participants: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          precision: 0,
        }
      },
    },
    animation: {
      duration: 2000,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Monthly Participation</h3>
      </div>
      <div className="h-60">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EventParticipationChart;