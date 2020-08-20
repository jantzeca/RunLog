import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles/welcome.scss';

const Welcome = () => {
  let history = useHistory();

  const onClickHandler = toLocation => e => {
    e.preventDefault();
    history.replace({ pathname: toLocation });
  }

  return (
    <div className='welcomeContainer'>
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
