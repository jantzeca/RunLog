import React from 'react'
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './styles/navbar.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        RunLog
      </h1>
      {/* <SignedInLinks /> */}
      <SignedOutLinks />
    </nav>
  )
}

export default Navbar
