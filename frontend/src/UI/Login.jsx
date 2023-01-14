import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import ErrorMsg from './ErrorMsg';


const URL = process.env.REACT_APP_BASEURL;
const LOGIN_URL = `${URL}/users/login`;
const Login = () => {
    const [formData, setFormData] = useState({});
    const [errorMsg, setErrorMsg] = useState({
      error: false,
      errTitle: '',
      errMessage: ''
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const formHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setFormData((prev) => {
          return { ...prev, [name]: value}
      })
    }

    const formSubmit = (e) => {
      e.preventDefault();
      loginData();
    }
    const loginData = async () => {
      try {
        const response = await fetch(LOGIN_URL, {
          headers: { 
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(response.ok) {
          login(data);
          navigate('/home')
        } else {
          setErrorMsg({
            error: true,
            errTitle: 'Invalid Login',
            errMessage: 'Please enter the correct login credentials.'
          });
        }
      } catch (error) {
        return error
      }
    }

  return (
    <div className='w-full max-w-sm p-4  border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8'>
      <h2>Login</h2>
      <form className='space-y-6' onChange={formHandler} onSubmit={formSubmit}>
        <div className="mb-4">
          <label className='block text-sm font-bold mb-2'>Enter your email:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
            type='email'
            name='email'
            required
          />
        </div>
        <div className="mb-6">
          <label className='block text-sm font-bold mb-2'>Enter your username:</label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
            type='text'
            name='username'
            required
            />
        </div>
        <div className="mb-6">
          <label className='block text-sm font-bold mb-2'>Enter your password</label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
            type='password'
            name='password'
          />
        </div>
        <button className='py-1 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit!</button>
        {errorMsg.error ? <ErrorMsg errTitle={errorMsg.errTitle} errMessage={errorMsg.errMessage}/> : ''}
      </form>  
    </div>
  )
}

export default Login