import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';
// import AuthContextProvider from './store/contexts/AuthContext';

const App = props => {
  const httpLink = createHttpLink({
    uri: '/api'
  });

  const authLink = setContext((_, { headers, ...context }) => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        ...headers,
        authorization: token || ''
      },
      ...context
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const authClient = new ApolloClient({
    uri: '/auth'
  });

  const authTokenHandler = token => {
    token
      ? localStorage.setItem('authToken', token)
      : console.log('no auth token');
  };

  return (
    <BrowserRouter>
      <Navbar />
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/profile/:id' component={Profile} />
        </Switch>
      </ApolloProvider>
      <ApolloProvider client={authClient}>
        <Switch>
          {/* <AuthContextProvider> */}
          <Route
            path='/signin'
            component={() => <SignIn {...{ authClient, authTokenHandler }} />}
          />
          {/* <Route path='/signup' component={SignUp} /> */}
          {/* </AuthContextProvider> */}
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ children, authClient, ...rest }) => {
  return (
    <ApolloProvider client={props.authClient}>
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('authToken') ? (
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
    </ApolloProvider>
  );
};

export default App;
