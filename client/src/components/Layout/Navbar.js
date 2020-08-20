import React, {useContext} from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { AuthContext } from '../../store/contexts/authContext';
import Logo from '../Logo/logo';
import { Link } from 'react-router-dom';
import './styles/navbar.scss';

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className="navbarContents">
        <Link class="logoLink" to="/">
          <Logo />
        </Link>
        {auth.authenticated ? (<SignedInLinks />) : (<SignedOutLinks />)}
      </div>
    </nav>
  );
};

export default Navbar;
