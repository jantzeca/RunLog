import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ajaxRequest } from '../../utils/utils';
// import { SignIn as signin } from '../../graphql/userQueries';

import './styles/signin.scss';

const SignIn = ({ authTokenHandler }) => {
  let [email, setEmail] = useState('chris@gmail.com');
  let [password, setPassword] = useState('testPassword');

  let history = useHistory();
  let location = useLocation();

  const handleChange = handler => e => {
    handler(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let body = JSON.stringify({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        query: `query signin($email: String, $password: String) {
            signin(email: $email, password: $password) {
              id
              token
            }
          }`,
        variables: { email, password }
      });
      let headers = {};
      let requestBody = { body, headers, method: 'POST' };
      let res = await ajaxRequest(requestBody, email, password);
      console.log(res);
      // let res = await fetch('/auth', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body: JSON.stringify({
      //     query: `
      //       query signin($email: String, $password: String) {
      //         signin(email: $email, password: $password) {
      //           id
      //           token
      //         }
      //       }
      //     `,
      //     variables: { email, password }
      //   })
      // });
      // res = await res.json();
      authTokenHandler(res.data.signin.token);
      setEmail('');
      setPassword('');

      let { from } = location.state || {
        from: { pathname: '/authDashboard' }
      };
      history.replace(from);
    } catch (error) {
      // Custom error alert popup
      console.error(error);
    }
    // authClient
    //   .query({
    //     query: signin,
    //     variables: { email, password }
    //   })
    //   .then(res => {
    //     authTokenHandler(res.data.signin.token);
    //     setEmail('');
    //     setPassword('');
    //   })
    //   .then(() => {
    //     let { from } = location.state || {
    //       from: { pathname: '/authDashboard' }
    //     };
    //     history.replace(from);
    //   });
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
