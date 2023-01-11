import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';

const URL = 'http://localhost:7001/users/login';

const Login = () => {
    const [formData, setFormData] = useState({});
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
        const response = await fetch(URL, {
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
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
      <h2>Login</h2>
      <form className='' onChange={formHandler} onSubmit={formSubmit}>
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
      </form>  
    </>
  )
}

export default Login