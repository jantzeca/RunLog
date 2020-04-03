import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
  /*   useHistory,
  useLocation */
} from 'react-router-dom';
// import { ApolloProvider } from 'react-apollo';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
// import SignUp from './components/Auth/SignUp';
// import AuthContextProvider from './store/contexts/AuthContext';

const App = props => {
  const authTokenHandler = token => {
    localStorage.setItem('authToken', token);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/signin'>
          <SignIn authTokenHandler={authTokenHandler} />
        </Route>
        <PrivateRoute path='/authDashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path='/user/profile/:id'>
          <Profile />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ children, ...rest }) => (
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
);

export default App;
