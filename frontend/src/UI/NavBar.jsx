import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authContext';

const URL = process.env.REACT_APP_BASEURL;
const USER_URL = `${URL}/user/logout`;

const NavBar = () => {
  const { isLoggedIn, logout, userData } = useAuth();

  const navigate = useNavigate();

  const logoutFunc = async () => {
    try {
      const response = await fetch(USER_URL, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer: ${userData.token}`
        },
        method: 'DELETE',
      });
      const data = response.json();
      //TODO - check if token gets cleared on logout
      logout()
      navigate('/') 
      return data
    } catch (error) {
      return error
    }
  }
  return (
  <nav className="navbar bg-gray-700">
    <div className="flex-1">
      <Link className="btn btn-ghost normal-case text-xl" to='/'>Job Tracker</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        {!isLoggedIn ? '' : <Link to='/home'><li className='hover:text-white px-6'>Job Board</li></Link>}
        {!isLoggedIn ? '' : <Link to='/profile'><li className='hover:text-white px-6'>Profile</li></Link>}
        {!isLoggedIn ? '' : <Link to='/jobrec'><li className='hover:text-white px-6'>Recommended Jobs</li></Link>}
        {isLoggedIn ? '' :<Link to='/signup'><li className='hover:text-white px-6'>Sign Up</li></Link>}
        {isLoggedIn ? <button onClick={logoutFunc}className='hover:text-white px-6'>Logout</button> : <button onClick={()=> navigate('/')}className='hover:text-white px-6'>Log In</button>}
      </ul>
    </div>
  </nav>
  )
}

export default NavBar;