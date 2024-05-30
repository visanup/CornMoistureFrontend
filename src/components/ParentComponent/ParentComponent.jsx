// ParentComponent.js
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Inspection from './components/Inspection/Inspection';
import Realtimegraph from './components/Realtimegraph/Realtimegraph';

function ParentComponent() {
  const [stats, setStats] = useState({
    min: null,
    max: null,
    average: null,
    sd: null,
    count: 0,
  });

  const handleStatsUpdate = (newStats) => {
    setStats(newStats);
  };

  return (
    <>
      <Navbar />
      <Inspection />
      <Realtimegraph onStatsUpdate={handleStatsUpdate} />
      <div>
        <h2>Stats from Realtimegraph</h2>
        <p>Min: {stats.min}</p>
        <p>Max: {stats.max}</p>
        <p>Average: {stats.average}</p>
        <p>SD: {stats.sd}</p>
        <p>Count: {stats.count}</p>
      </div>
    </>
  );
}

export default ParentComponent;