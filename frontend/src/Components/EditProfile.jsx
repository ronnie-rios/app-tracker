import { useState } from 'react'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    skillName: '',
    years: 0
  });
  const [payload, setPayload] = useState([])
 
  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value}
    })
  }

  const addSkills = (e) => {
    console.log('hello')
    e.preventDefault();
    setPayload((prev) => { return { ...prev, formData }})
    setFormData({
      skillName: '',
      years: ''
    });
  }
  console.log(payload)
  return (
    <div>
      <form onChange={formHandler} onSubmit={addSkills}>
        <label>Enter tech</label>
        <input type="text" name='skillName'  required/>
        <label>Enter years of experience</label>
        <input type="number" min={0} name='years'  required/>
        <button >Add more</button>
      </form>
    </div>
  )
}

export default EditProfile