import { useState } from 'react';
const URL = 'http://localhost:7001/users/signup';

const Signup = () => {
    const [formData, setFormData] = useState({});

    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => {
            return { ...prev, [name]: value}
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
       signupData();
       
    }

    const signupData = async () => {
        try {
          const response = await fetch(URL, {
            headers: { 
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col'>
      <div className="text-center">
        <h2 className="text-5xl font-bold">Sign-Up</h2>
        <p className="py-6">Create an account and start tracking your applications, and what stage of the hiring process you are in</p>
      </div>
      <form className="card px-4 py-4 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onChange={formHandler} onSubmit={formSubmit}>
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
        <button className='py-1 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Create Account</button>
      </form>
      </div> 
    </div>
  )
}

export default Signup