import { SIGN_IN_SUCCESSFUL, SIGN_IN_ERROR, SIGN_OUT } from './types';

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        authenticated: action.authenticated,
        isAdmin: action.isAdmin
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        authError: action.message
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        isAdmin: false
      }
    default:
      return state;
  }
};
