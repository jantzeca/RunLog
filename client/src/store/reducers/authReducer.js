export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESSFUL':
      return {
        ...state,
        authError: null
      };
    case 'SIGN_IN_ERROR': {
      return {
        ...state,
        authError: 'Sign in failed'
      };
    }
  }
};
