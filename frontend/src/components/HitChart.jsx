import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const HitChart = ({ hits }) => {
  const requestTypeData = hits.reduce((acc, hit) => {
    acc[hit.request_type] = (acc[hit.request_type] || 0) + 1;
    return acc;
  }, {});

  const osData = hits.reduce((acc, hit) => {
    acc[hit.os] = (acc[hit.os] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Request Types</h2>
        <Bar
          data={{
            labels: Object.keys(requestTypeData),
            datasets: [
              {
                label: 'Request Types',
                data: Object.values(requestTypeData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Operating Systems</h2>
        <Pie
          data={{
            labels: Object.keys(osData),
            datasets: [
              {
                label: 'Operating Systems',
                data: Object.values(osData),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default HitChart;
