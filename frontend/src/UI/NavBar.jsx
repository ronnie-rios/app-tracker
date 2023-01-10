import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
  
  return (
  <nav className="navbar bg-gray-700">
    <div className="flex-1">
      <Link className="btn btn-ghost normal-case text-xl" to='/'>Job Tracker</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
      <Link to='/'><li className='hover:text-white px-6'>Table</li></Link>
      </ul>
    </div>
  </nav>
  )
}

export default NavBar