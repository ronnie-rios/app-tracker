import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authContext';

const NavBar = () => {
  const { logout, token } = useAuth();

  const navigate = useNavigate();

  const logoutFunc = async () => {
    try {
      const response = await fetch('http://localhost:7001/users/logout', {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer: ${token.token}`
        },
        method: 'DELETE',
      });
      const data = response.json();
      logout()
      navigate('/') 
      return data
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
        <Link to='/'><li className='hover:text-white px-6'>Home</li></Link>
        <Link to='/home'><li className='hover:text-white px-6'>View Jobs</li></Link>
        <Link to='/signup'><li className='hover:text-white px-6'>Sign-up</li></Link>
        <button onClick={()=> logoutFunc()}className='hover:text-white px-6'>Logout</button>
      </ul>
    </div>
  </nav>
  )
}

export default NavBar