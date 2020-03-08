// import React, { createContext, useReducer, useEffect } from 'react';
// import { authReducer } from '../reducers/authReducer';

// export const AuthContext = createContext();

// const AuthContextProvider = props => {
//   const [auth, dispatch] = useReducer(authReducer, '', () => {
//     console.log('test');
//   });
//   useEffect(() => {
//     localStorage.setItem('authToken', auth);
//   }, [auth]);

//   return (
//     <AuthContextProvider value={{ auth, dispatch }}>
//       {props.children}
//     </AuthContextProvider>
//   );
// };

// export default AuthContextProvider;
