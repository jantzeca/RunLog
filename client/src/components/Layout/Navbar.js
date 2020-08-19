import React, {useContext} from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { AuthContext } from '../../store/contexts/authContext';
import './styles/navbar.scss';

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <h1>RunLog</h1>
      {auth.authenticated ? (<SignedInLinks />) : (<SignedOutLinks />)}
    </nav>
  );
};

export default Navbar;
