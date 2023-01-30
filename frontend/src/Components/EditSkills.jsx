import { useState } from 'react'
import { useAuth } from '../store/authContext';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/edit/skills/`;

const EditSkills = ({ toggleRender, setToggleRender, setEditSkills }) => {
  const [formData, setFormData] = useState({
    skillName: '',
    years: null
  });

  const [payload, setPayload] = useState([]);
  const { token } = useAuth(); 

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value}
    })
  }

  const editData = async (e) => {
    console.log('edit data fnc from edit skills component')
    e.preventDefault();
    try {
      const response = await fetch(APP_URL + token.id, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token.token}`
        },
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setToggleRender(!toggleRender)
      return data;
    } catch (error) {
      return error
    }
  }

  const deleteSkill = (index) => {
    setPayload(payload.filter((element, idx) => { 
      return idx != index
    }))
  }

  const addSkills = (e) => {
    e.preventDefault();
    payload.push()
    setPayload((prev) => { return [ ...prev, formData ]})
    setFormData({
      skillName: '',
      years: ''
    });
  }

  return (
    <div>

      <button onClick={() => setEditSkills(false)}className="btn btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <form onChange={formHandler} onSubmit={addSkills}>
        <label>Enter tech:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' type="text" name='skillName' value={formData.skillName} placeholder='ex: JavaScript' required/>
        <label>Enter a number for years of experience:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' type="number" min={0} name='years' value={formData.years} required/>
        <button>Add more</button>
      </form>
      <h3>skills that will be added</h3>
      {payload && payload.map((item, idx) => {
        return (
          <>
            <h3>{item.skillName}</h3>
            <h3>{item.years}</h3>
            <AiOutlineCloseCircle 
              className=' text-white hover:text-red-600 float-right'
              onClick={deleteSkill.bind(this, idx)}
            />
          </>
        )
      })}
      <button onClick={editData}>Submit your skills</button>
    </div>
  )
}

export default EditSkills