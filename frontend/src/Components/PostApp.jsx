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
    <div>
      <form onChange={formHandler} onSubmit={formSubmit}>
        <label>Enter the role:</label>
        <input 
          type='text'
          name='jobRole'
        />
        <label>Enter the company:</label>
        <input 
          type='text'
          name='company'
        />
        <label>Enter the technologies asked:</label>
        <input 
          type='text'
          name='technologies'
        />
        <button>Submit!</button>
      </form>
    </div>
  )
}
