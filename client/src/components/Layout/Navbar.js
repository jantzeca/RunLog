import React, {useContext} from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { AuthContext } from '../../store/contexts/authContext';
import './styles/navbar.scss';

const Navbar = () => {
  let { auth } = useContext(AuthContext);
  console.log(auth);

  return (
    <nav className='navbar'>
      <h1>RunLog</h1>
      {auth.authenticated ? (<SignedInLinks />) : (<SignedOutLinks />)}
    </nav>
  );
};

export default Navbar;
