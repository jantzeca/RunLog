import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/authContext';
import { SearchIcon } from './searchIcon';

import './styles/navbar.scss';

const SignedInLinks = () => {
  const { signOut, auth } = useContext(AuthContext);

  const openSearch = (e) => {
    // e.target.classList.add('hidden');
    // remove hidden from the search box?
  };

  return (
    <ul>
      <li>
        <SearchIcon onClick={openSearch}/>
      </li>
      <li>
        <Link to={`${auth.isAdmin ? '/adminhome' : '/home'}`} className='link-item'>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to='/newrun' className='link-item'>
          New Run
        </Link>
      </li>
      {/* <li>
        <NavDropDown />
      </li> */}
      <li>
        {/* ^ Replace logout with downward carrot and profile pic. Make profile pic component that takes a size parameter */}
        <Link to='/signin' onClick={signOut} className='link-item'>
          Log Out
        </Link>
      </li>
    </ul>
  );
};

export default SignedInLinks;
