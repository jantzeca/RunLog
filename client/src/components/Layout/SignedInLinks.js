import React from 'react'
import { Link } from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <ul>
      <li>
        <Link to='/' className='link-item'>
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
    </ul>
  )
}

export default SignedInLinks;
