import React from 'react'
import { Link } from 'react-router-dom';

import './styles/signedOutLinks.scss';

const SignedOutLinks = () => (
  <ul>
    <li>
      <Link to='/signin' className='btn btn-secondary'>
        Log In
      </Link>
    </li>
  </ul>
)

export default SignedOutLinks
