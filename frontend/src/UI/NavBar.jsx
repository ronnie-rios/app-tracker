import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:7001/users/logout', {
        headers: { 
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
}
  return (
  <nav className="navbar bg-gray-700">
    <div className="flex-1">
      <Link className="btn btn-ghost normal-case text-xl" to='/'>Job Tracker</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <Link to='/about'><li className='hover:text-white px-6'>About</li></Link>
        <Link to='/'><li className='hover:text-white px-6'>View Jobs</li></Link>
        <Link to='/signup'><li className='hover:text-white px-6'>Sign-up</li></Link>
        <button onClick={()=> logout()}className='hover:text-white px-6'>Logout</button>
      </ul>
    </div>
  </nav>
  )
}

export default NavBar