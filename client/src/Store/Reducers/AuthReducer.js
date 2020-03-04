const initState = {
  authError: null
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.error('login error');
      return {
        ...state,
        authError: 'Login failed'
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SIGNUP_ERROR':
      return { ...state, authError: action.err.message }; // make sure to return this message
    default:
      return state;
  }
};

export default AuthReducer;
