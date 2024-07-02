import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }} className='bar-chart-container'>
        <h2 className='ml-48'>Number of requests by request type</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        className='bar-chart'
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="count" fill="rgba(54, 162, 235, 0.6)" />
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
