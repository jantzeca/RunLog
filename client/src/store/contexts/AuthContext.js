import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [auth, dispatch] = useReducer(authReducer, { authError: null });

  const checkAuth = credentials => {
    if (credentials) {
      dispatch({ type: 'SIGN_IN_SUCCESSFUL' });
    } else {
      dispatch({ type: 'SIGN_IN_SUCCESSFUL' });
    }
  };

  return (
    <AuthContextProvider value={{ auth, dispatch, checkAuth }}>
      {props.children}
    </AuthContextProvider>
  );
};

export default AuthContextProvider;
