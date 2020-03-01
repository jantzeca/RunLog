import React from 'react'
import './styles/navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <h1>
          RunLog
        </h1>
        <ul>
          <li>
            <a href='www.google.com'>
              About
            </a>
          </li>
          <li>
            <a href='www.google.com'>
              Log In
            </a>
          </li>
        </ul>
      </nav> 
    </div>
  )
}

export default Navbar
