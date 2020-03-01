import React from 'react'
import { Link } from 'react-router-dom';
import './styles/navbar.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        RunLog
      </h1>
      <ul>
        <li>
          <Link to='/' className='link-item'>
            About
          </Link>
        </li>
        <li>
          <Link to='/' className='link-item'>
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
