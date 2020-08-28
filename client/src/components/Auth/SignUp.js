import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/authContext';
import { addUser } from '../../graphql/userQueries';
import { useMutation } from 'react-apollo';

import './styles/inputForm.scss';

const SignUp = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let { authStatus, setToken } = useContext(AuthContext);

  let history = useHistory();

  const [createUser] = useMutation(addUser);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          email,
          password,
          isAdmin: false
        }
      });

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
      // On Sign Up, take to profile to update information.
      // Maybe oven a specific page just for this case with open inputs
      // instead of the on hover edit buttons.
      if (body.success) {
        setToken(body.token);
        authStatus(true, body.isAdmin, null);
        setEmail('');
        setPassword('');
        history.replace({ pathname: '/home' }); // dashboard for now.
      } else {
        throw new Error('error in getting the token');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = handler => e => {
    handler(e.target.value);
  }

  return (
    <div className="signInContainer">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Join RunLog<br/>Today</h1>
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
        <input type="submit" value="Sign Up"/> 
      </form>
    </div>
  );
};

export default SignUp;
