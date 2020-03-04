import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/AuthActions';
import { Redirect } from 'react-router-dom';

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
    this.props.signIn(this.state);
  };

  render() {
    const { authError } = this.props;
    return (
      <div className='container'>
        <form>
          <h5>Sign In</h5>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' />
          </div>
          <div className='input-field'>
            <button className='btn'></button>
            <div className='center'>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

export default connect(mapStateToProps, { signIn })(SignIn);
