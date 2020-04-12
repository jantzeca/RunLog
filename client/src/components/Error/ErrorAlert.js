import React from 'react';
import PropTypes from 'prop-types';

import './styles/errorAlert.scss';

const ErrorAlert = ({ message }) => {
  return (
    <div className='error'>
      <div className='text'>
        <h1>Error:</h1>
        <p>{message || 'An error occurred'}</p>
      </div>
    </div>
  );
};

ErrorAlert.proptypes = {
  message: PropTypes.string,
};

export default ErrorAlert;
