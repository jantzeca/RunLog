import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import { SIGN_IN_SUCCESSFUL, SIGN_IN_ERROR, SIGN_OUT } from '../reducers/types';
import { any } from 'prop-types';

type contextProps = {
  auth: any,
  dispatch: React.Dispatch<any>,
  authStatus: Function,
  setToken: Function,
  signOut: Function
};

export const AuthContext = createContext<Partial<contextProps>>({});

const initState = {
  authError: null,
  authenticated: false,
  isAdmin: false,
};

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, dispatch] = useReducer(authReducer, initState);

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const authStatus = (signedIn: boolean, isAdmin: boolean, message?: string|undefined) => {
    if (signedIn) {
      dispatch({ type: SIGN_IN_SUCCESSFUL, authenticated: true, isAdmin });
    } else {
      dispatch({ type: SIGN_IN_ERROR, message });
    }
  };

  const signOut = () => {
    dispatch({ type: SIGN_OUT });
    localStorage.setItem('token', '');
  };

  return (
    <AuthContext.Provider
      value={{ auth, dispatch, authStatus, setToken, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
