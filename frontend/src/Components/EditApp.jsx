import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const EditApp = ({ appData, viewMore, setViewMore}) => {
  const [formData, setFormData] = useState({
    interview: false,
    phoneScreening: false,
    accepted: false,
    denied: false
  });

  const editData = async () => {
    try {
      const response = await fetch(`http://localhost:7001/applications/${appData._id}`, {
        headers: { 
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckbox = (e) => {
    const name = e.target.name;
  
    if (e.target.checked) {
      setFormData((prev)=>{
        return { ...prev, [name]: true}
      })
    } else {
      setFormData((prev)=>{
        return { ...prev, [name]: false}
      })
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    editData();

  }

  return (
  <>
    <form onChange={handleCheckbox} onSubmit={formSubmit}>
      Interview <input type='checkbox' name='interview' value={false} />
      Phone Screening <input type='checkbox' name='phoneScreening' value={false} />
      Accepted <input type='checkbox' name='accepted'value={true} />
      Denied / Didn't hear back <input type='checkbox' name='denied' value={false}/>
      <button>submit</button>
    </form>
  </>
  )
}
