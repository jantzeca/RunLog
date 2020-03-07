import React, { Component } from 'react';

import './styles/signin.scss';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { authError } = this.props;
    return (
      <div className='container'>
        <form>
          <h5>Sign In</h5>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={this.handleChange}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={this.handleChange}
            />
          </div>
          <div className='submit-field'>
            <input className='btn' type='submit' value='submit' />
            <div className='center'>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
