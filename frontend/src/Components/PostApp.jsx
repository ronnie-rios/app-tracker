import { useState } from 'react';
import { useAuth } from '../store/authContext';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/applications`

export const PostApp = ({ toggleRender, setToggleRender }) => {
  const [formData, setFormData] = useState({});
  const { token } = useAuth();

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value}
    })
  }
  
  const formSubmit = (e) => {
    e.preventDefault();
    postData();
  }
  
  const postData = async () => {
    formData.owner = token.id
    try {
      const response = await fetch(APP_URL, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token.token}`
        },
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setToggleRender(!toggleRender)
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
  }

  return (
    <form className='' onChange={formHandler} onSubmit={formSubmit}>
      <div className="mb-4">
        <label className='block text-sm font-bold mb-2'>Enter the role:</label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
          type='text'
          name='jobRole'
          required
        />
      </div>
      <div className="mb-6">
        <label className='block text-sm font-bold mb-2'>Enter the company:</label>
        <input 
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
          type='text'
          name='company'
          required
          />
      </div>
      <div className="mb-6">
        <label className='block text-sm font-bold mb-2'>Enter the technologies asked:</label>
        <input 
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
          type='text'
          name='technologies'
        />
      </div>
      <div className="mb-6">
        <label className='block text-sm font-bold mb-2'>Date Submitted:</label>
        <input 
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
          type='date'
          name='dateSubmitted'
        />
      </div>
      <button className='py-1 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit!</button>
    </form>
  )
}

