import React, { useState } from 'react';

import './styles/signin.scss';

const SignIn = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let authError = false;

  const handleChange = e => handler => {
    handler(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // useContext thing here
    // maybe add jwt
    console.log(email, password);
    authError = false;
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
          />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={handleChange(setPassword)}
          />
        </div>
        <div className='submit-field'>
          <input className='btn' type='submit' value='submit' />
          <div className='center'>{authError ? <p>{authError}</p> : null}</div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
