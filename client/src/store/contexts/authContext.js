import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import { SIGN_IN_SUCCESSFUL, SIGN_IN_ERROR, SIGN_OUT } from '../reducers/types';

export const AuthContext = createContext();

const initState = {
  authError: null,
  authenticated: false,
  isAdmin: false,
};

const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, initState);

  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  const authStatus = (signedIn, isAdmin, message) => {
    if (signedIn) {
      dispatch({ type: SIGN_IN_SUCCESSFUL, authenticated: true, isAdmin });
    } else {
      dispatch({ type: SIGN_IN_ERROR, message });
    }
  };

  const signOut = () => {
    dispatch({ type: SIGN_OUT });
    localStorage.setItem('token', null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, dispatch, authStatus, setToken, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
