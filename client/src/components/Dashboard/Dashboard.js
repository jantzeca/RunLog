import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './styles/dashboard.scss';

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <h1>Temp Dashboard</h1>
  );
};

export default Dashboard;
