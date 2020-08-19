import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import welcome from './img/welcome.jpg';

import './styles/welcome.scss';

const Welcome = () => {
  let location = useLocation();
  let history = useHistory();

  const onClickHandler = toLocation => e => {
    e.preventDefault();
    history.replace({ pathname: toLocation });
  }

  return (
    <div className='welcomeContainer'>
      <img src={welcome} />
      <div className="overlayShade"></div>
      <div className="logInSignUpForm">
        <h1 id='welcomeBanner'>Store All of Your Runs in One Place</h1>
        <button onClick={onClickHandler('signup')} className="welcomeButton" id="signUpButton">Sign Up</button>
        <button onClick={onClickHandler('signin')} className="welcomeButton" id="logInButton">Log In</button>
      </div>
    </div>
  );
};

export default Welcome;
