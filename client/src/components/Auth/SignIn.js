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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h5>Sign In</h5>
        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={handleChange(setEmail)}
            value={email}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={handleChange(setPassword)}
            value={password}
          />
        </div>
        <div className='submit-field'>
          <input className='btn' type='submit' value='submit' />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
