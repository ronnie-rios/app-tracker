import { useState } from 'react';
const URL = 'http://localhost:7001/applications';

export const PostApp = ({ toggleRender, setToggleRender }) => {
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
    postData();
  }
  
  const postData = async () => {
    try {
      const response = await fetch(URL, {
        headers: { 
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setToggleRender(!toggleRender)
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full max-w-xs'>
      <form className='shadow-md roundex px-8 pt=6 pb-8 mb-4' onChange={formHandler} onSubmit={formSubmit}>
        <div className="mb-4">
          <label className='block text-sm font-bold mb-2'>Enter the role:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
            type='text'
            name='jobRole'
          />
        </div>
        <div className="mb-6">
          <label className='block text-sm font-bold mb-2'>Enter the company:</label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
            type='text'
            name='company'
            />
        </div>
        <div className="mb-6">
          <label className='block text-sm font-bold mb-2'>Enter the technologies asked:</label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
            type='text'
            name='technologies'
          />
        </div>
        <button className='py-2 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit!</button>
      </form>
      </div>
  )
}

