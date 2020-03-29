import React, { useState } from 'react';
import { SignIn as signin } from '../../graphql/userQueries';

import './styles/signin.scss';

const SignIn = ({ authClient, authTokenHandler }) => {
  let [email, setEmail] = useState('chris@gmail.com');
  let [password, setPassword] = useState('testPassword');

  const handleChange = handler => e => {
    handler(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // useContext thing here
    authClient
      .query({
        query: signin,
        variables: { email, password }
      })
      .then(res => {
        authTokenHandler(res.data.signin.token);
        setEmail('');
        setPassword('');
        // props.history.push('/');
      });
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
          {/* <div className='center'>{authError ? <p>{authError}</p> : null}</div> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
