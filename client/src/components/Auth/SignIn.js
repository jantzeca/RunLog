import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/authContext';

import './styles/signin.scss';

const SignIn = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let { authStatus, setToken } = useContext(AuthContext);

  let history = useHistory();
  let location = useLocation();

  const handleChange = handler => e => {
    handler(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/get-token', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const body = await res.json();
      if (body.success) {
        setToken(body.token);
        authStatus(true, body.isAdmin, null);
        setEmail('');
        setPassword('');
        const { from } = location.state || {
          from: { pathname: '/adminDashboard' }
        };
        history.replace(from);
      } else {
        console.log(body.message);
        authStatus(false, false, body.message);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signInContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className="infoInputContainer">
          <div className="loginInputSection">
            <p>Email</p>
            <input onChange={handleChange(setEmail)} type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="loginInputSection">
            <p>Password</p>
            <input onChange={handleChange(setPassword)} type="password" name="password" id="password" placeholder="Password" />
          </div>
        </div>
        <input type="submit" value="Log In"/>
      </form>
    </div>
  );
};

export default SignIn;
