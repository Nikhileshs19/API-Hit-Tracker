import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import '../App.css'
// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance
      }
    }
  }, [data]);

  const chartData = {
    labels: data.map((entry) => entry.browser),
    datasets: [
      {
        label: 'Requests per Browser',
        data: data.map((entry) => entry.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',    // Red
          'rgba(54, 162, 235, 0.6)',    // Blue
          'rgba(255, 206, 86, 0.6)',    // Yellow
          'rgba(75, 192, 192, 0.6)',    // Green
          'rgba(153, 102, 255, 0.6)',   // Purple
          'rgba(255, 159, 64, 0.6)',    // Orange
          'rgba(255, 99, 132, 0.6)',    // Red (repeat for more browsers if needed)
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h2 className="chart-title ml-14">Requests per Browser</h2>
      <div className="chart w-1/3">
        <Pie ref={chartRef} data={chartData} options={chartOptions} className='w-full'/>
      </div>
    </div>
  );
};

export default PieChart;
