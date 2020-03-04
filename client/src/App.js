import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Navbar from './components/Layout/Navbar';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';

const App = () => {
  const client = new ApolloClient({
    uri: '/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" component={Dashboard} /> */}
            <Route exact path='/profile/:id' component={Profile} />
            <Route path='/signin' component={SignIn} />
          </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
