import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, labels }) => {
  const [barData, setBarData] = useState({});

  useEffect(() => {
    setBarData({
      labels: labels,
      datasets: [
        {
          label: 'Number of Requests',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          
        },
      ],
    });
  }, [data, labels]);

  return (
    <div>
      <h2>Bar Chart: Number of Requests by Request Type</h2>
      <Bar data={barData} />
    </div>
  );
};

export default BarChart;
