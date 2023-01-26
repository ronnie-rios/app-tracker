import { useState } from 'react'
import { useAuth } from '../store/authContext';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/edit/skills/`;

const EditSkills = ({ setEditSkills }) => {
  const [formData, setFormData] = useState({
    skillName: '',
    years: null
  });

  const [payload, setPayload] = useState([])
  const { isLoggedIn, token } = useAuth(); 

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value}
    })
  }

  const editData = async (e) => {
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
      <button onClick={() => setEditSkills(false)}>Close Edit</button>
      <form onChange={formHandler} onSubmit={addSkills}>
        <label>Enter tech</label>
        <input type="text" name='skillName' value={formData.skillName} required/>
        <label>Enter years of experience</label>
        <input type="number" min={0} name='years' value={formData.years} required/>
        <button >Add more</button>
      </form>
      populate the skills here
      {payload && payload.map((item, idx) => {
        return (
          <>
            <h3>{item.skillName}</h3>
            <h3>{item.years}</h3>
            <button onClick={deleteSkill.bind(this, idx)}>Remove skill</button>
          </>
        )
      })}
      <button onClick={editData}>Submit your skills</button>
    </div>
  )
}

export default EditSkills