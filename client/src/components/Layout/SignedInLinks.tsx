import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/authContext';

import './styles/navbar.scss';

const SignedInLinks = () => {
  const { signOut } = useContext(AuthContext);

  const logOut = () => {
    if (signOut) {
      signOut();
    }
  }

  return (
    <ul>
      <li>
        <Link to='/adminDashboard' className='link-item'>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to='/training' className='link-item'>
          Training
        </Link>
      </li>
      <li>
        <Link to='/challenges' className='link-item'>
          Challenges
        </Link>
      </li>
      <li>
        <Link to='/signin' onClick={logOut} className='link-item'>
          Log Out
        </Link>
      </li>
    </ul>
  );
};

export default SignedInLinks;
