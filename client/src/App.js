import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import { createHttpLink } from 'apollo-link-http';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
// import { setContext } from 'apollo-link-context';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';
// import AuthContextProvider from './store/contexts/AuthContext';

const App = () => {
  const authTokenHandler = token => {
    localStorage.setItem('token', token);
  };

  // const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem('token');
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   };
  // });

  // const httpLink = createHttpLink({
  //   uri: '/graphql',
  //   credentials: 'same-origin'
  // });

  const client = new ApolloClient({
    uri: '/graphql',
    request: operation => {
      console.log(operation);
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
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/signin'>
            <SignIn authTokenHandler={authTokenHandler} />
          </Route>
          {/* <Route path='/signup'>
            <SignUp />
          </Route> */}
          <PrivateRoute path='/adminDashboard'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/user/profile/:id'>
            <Profile />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      localStorage.getItem('token') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: location }
          }}
        />
      )
    }
  />
);

export default App;
