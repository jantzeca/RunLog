import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';
// import AuthContextProvider from './store/contexts/AuthContext';

const App = () => {
  const client = new ApolloClient({
    uri: '/api'
  });

  const authClient = new ApolloClient({
    uri: '/auth'
  });

  const authTokenHandler = token => {
    console.log(token);
  };

  return (
    <ApolloProvider client={authClient}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          {/* <AuthContextProvider> */}
          <Route
            path='/signin'
            component={() => <SignIn {...{ authClient, authTokenHandler }} />}
          />
          {/* <Route path='/signup' component={SignUp} /> */}
          {/* </AuthContextProvider> */}
          <Route exact path='/profile/:id' component={Profile} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
