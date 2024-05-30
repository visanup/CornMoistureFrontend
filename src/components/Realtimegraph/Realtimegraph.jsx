import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Realtimegraph.module.css'; // นำเข้าฟังก์ชัน CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Realtimegraph = ({ onStatsUpdate }) => {
  const [data, setData] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [realtime, setRealtime] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [stats, setStats] = useState({
    min: null,
    max: null,
    average: null,
    sd: null,
    count: 0,
  });

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  };

  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: 'Dataset 1',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    let interval;
    if (realtime) {
      interval = setInterval(fetchData, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [realtime]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8002/get/data');
      if (response.data.data.length) {
        setData(currentData => {
          let newData = [...currentData, ...response.data.data.slice(lastIndex)];
          return newData;
        });
        setLastIndex(prevIndex => prevIndex + response.data.data.length);
      }
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }
  };

  const calculateStats = (data) => {
    const filteredData = data.filter(value => value >= 7);

    if (filteredData.length > 0) {
      const min = Math.min(...filteredData);
      const max = Math.max(...filteredData);
      const average = filteredData.reduce((acc, val) => acc + val, 0) / filteredData.length;
      const sd = Math.sqrt(filteredData.reduce((acc, val) => acc + ((val - average) ** 2), 0) / filteredData.length);
      const count = filteredData.length;

      const newStats = { min, max, average, sd, count };
      setStats(newStats);
      return newStats;
    } else {
      const newStats = {
        min: null,
        max: null,
        average: null,
        sd: null,
        count: 0,
      };
      setStats(newStats);
      return newStats;
    }
  };

  const handleStartRealtime = () => {
    setLastIndex(0);
    setData([]);
    setStartTime(new Date());
    setEndTime(null);
    setRealtime(true);
    setStats({
      min: null,
      max: null,
      average: null,
      sd: null,
      count: 0,
    });
  };

  const handleStopRealtime = () => {
    setRealtime(false);
    setEndTime(new Date());
    const newStats = calculateStats(data);
    onStatsUpdate(newStats);
  };

  return (
    <div>
      <button onClick={handleStartRealtime}>Start Realtime</button>
      <button onClick={handleStopRealtime}>Stop Realtime</button>
      <div className="graph-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div>
        <p>Start Time: {startTime ? startTime.toLocaleString() : 'N/A'}</p>
        <p>End Time: {endTime ? endTime.toLocaleString() : 'N/A'}</p>
        <p>Min: {stats.min}</p>
        <p>Max: {stats.max}</p>
        <p>Average: {stats.average}</p>
        <p>SD: {stats.sd}</p>
        <p>Count: {stats.count}</p>
      </div>
    </div>
  );
};

export default Realtimegraph;