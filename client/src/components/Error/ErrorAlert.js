import React from 'react';

import './styles/error.scss';

const ErrorAlert = ({ message }) => {
  return (
    <div className="error">
      <div className="text">
        <h1>Error:</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
