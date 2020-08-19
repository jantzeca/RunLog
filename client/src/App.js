import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Navbar from './components/Layout/Navbar';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
import Welcome from './components/Auth/Welcome';
// import SignUp from './components/Auth/SignUp';
import AuthContextProvider, { AuthContext } from './store/contexts/authContext';

const App = () => {
  const client = new ApolloClient({
    uri: '/graphql',
    request: (operation) => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token ? token : ''
        }
      });
    }
  });

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <PublicRoute exact path="/" />
            <Route path='/welcome'>
              <Welcome />
            </Route>
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route path='/signup'>
              <h1>Pretend SignUp Page</h1>
              {/* <SignUp /> */}
            </Route>
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

const PublicRoute = ({ ...attrs }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...attrs}
      render={() =>
        auth.authenticated ? (
          <h1>Temp Dashboard Replacement</h1>
        ) : (
          <Welcome />
        )
      }
    />
  )
}

/**
 * @param {Component} children - The component to be mounted if authenticated
 * @param rest - Any other Attributes to be added to the Route component
 */
const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return (<Route
    {...rest}
    render={({ location }) =>
      auth.authenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/welcome',
            state: { from: location }
          }}
        />
      )
    }
  />)
};

/**
 * @param {Component} children - The component to be mounted if authenticated
 * @param rest - Any other Attributes to be added to the Route component
 */
const AdminRoute = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authenticated && auth.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/welcome',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
};

export default App;
