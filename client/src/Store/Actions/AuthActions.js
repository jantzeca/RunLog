export const signIn = credentials => {
  return (dispatch, getState) => {
    // Some kind of authentication process
    dispatch({ type: 'LOGIN_SUCCESS' });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    // Some kind of signout process
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  };
};

export const signUp = newUser => {
  return (dispatch, getState) => {
    try {
      // Graphql addUser mutation
      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SIGNUP_ERROR' });
    }
  };
};
