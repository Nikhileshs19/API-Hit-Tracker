import React, { useEffect, useState } from 'react';
import DashboardTable from './components/DashboardTable';
import PieChart from './components/PieChart';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import ErrorBoundary from './ErrorBoundary';
import BarChart from './components/BarChart';
import CustomBarChart from './components/CustomBarChart';

const ENDPOINT = 'http://localhost:5000';

const App = () => {
  const [hits, setHits] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('new_hit', (newHit) => {
      setHits((prevHits) => [...prevHits, newHit]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hits', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setHits(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHits();
  }, []);

  const getBrowsersData = () => {
    const browsers = {};
    hits.forEach((hit) => {
      const browser = hit.user_agent.split(' ')[0];
      browsers[browser] = browsers[browser] ? browsers[browser] + 1 : 1;
    });
    return Object.keys(browsers).map((browser) => ({
      browser: browser,
      count: browsers[browser],
    }));
  };

  const getBarChartData = () => {
    const requestTypes = {};
    hits.forEach(hit => {
      const type = hit.request_type;
      requestTypes[type] = requestTypes[type] ? requestTypes[type] + 1 : 1;
    });

    return Object.keys(requestTypes).map(type => ({
      type: type,
      count: requestTypes[type],
    }));
  };

  return (
    <div>
      <h1 className='m-auto flex justify-center mt-5'>API Hit Analytics Dashboard</h1>
      <div className="row flex justify-center">
        <div>
        <ErrorBoundary>
          <PieChart data={getBrowsersData()} /> 
        </ErrorBoundary>
        </div>
        <div>
          <ErrorBoundary>
            {/* <BarChart data={hits} /> */}
            <CustomBarChart data={getBarChartData()} />
          </ErrorBoundary>
        </div>
      </div>
      <div className="col-md-6 mx-20 ">
        <DashboardTable data={hits} />
      </div>


    </div>
  );
};

export default App;
