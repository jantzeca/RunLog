import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Navbar from './components/Layout/Navbar';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';
import AuthContextProvider, { AuthContext } from './store/contexts/authContext';

const App = (): JSX.Element => {
  const client = new ApolloClient({
    uri: '/graphql',
    request: (operation) => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token || '',
        }
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/signin'>
              <SignIn />
            </Route>
            {/* <Route path='/signup'>
              <SignUp />
            </Route> */}
            <AdminRoute path='/adminDashboard'>
              <AdminDashboard />
            </AdminRoute>
            <PrivateRoute path='/user/profile/:id'>
              <Profile />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </ApolloProvider>
  );
};

/**
 * @param {Component} children - The component to be mounted if authenticated
 * @param {string} path - Route for component to be rendered
 * @param rest - Any other Attributes to be added to the Route component
 */
const AdminRoute = ({ children, path, ...rest }: { children: JSX.Element; path: string }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      path={path}
      {...rest}
      render={({ location }) =>
        auth.authenticated && auth.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

/**
 * @param {Component} children - The component to be mounted if authenticated
 * @param {string} path - Route for component to be rendered
 * @param rest - Any other Attributes to be added to the Route component
 */
const PrivateRoute = ({ children, path, ...rest}: { children: JSX.Element; path: string; }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      path={path}
      {...rest}
      render={({ location }) =>
        auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
