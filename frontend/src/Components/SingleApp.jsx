import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext'

const SingleApp = () => {
  const { token } = useAuth();

  const [singleAppData, setSingleAppData] = useState([]);
  const [formData, setFormData] = useState({
    interview: false,
    phoneScreening: false,
    accepted: false,
    denied: false
  });

  const id = useParams().id;
  const navigate = useNavigate()

  const getSingleApp = async () => {
      const response = await fetch(`http://localhost:7001/applications/${id}`, {
        headers: { 
          'Authorization': `bearer ${token.token}`
        },
        method: 'GET',
      });
      const data = await response.json();
      setSingleAppData(data);
  }
  useEffect(()=> {
      getSingleApp()
  }, []);

  const editData = async () => {
    try {
      const response = await fetch(`http://localhost:7001/applications/${id}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token.token}`
        },
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
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
    navigate(`/home`)
  }

return (
  <>
    <div>
      <h3>Job info</h3>
      <h4>Role: {singleAppData.jobRole}</h4>
      <h4>Company: {singleAppData.company}</h4>
      <h4>Tech Stack: {singleAppData.technologies}</h4>
      <h4>How'd you hear about this job? {singleAppData.fromWhere}</h4>
      <h3>Job status</h3>
      <p>Interview: {singleAppData.interview === true ? 'yes' : 'no'} </p>
      <p>Phone Call: {singleAppData.phoneScreening === true ? 'yes' : 'no'} </p>
      <p>Accepted: {singleAppData.accepted === true ? 'yes' : 'no'}  </p>
      <p>Denied: {singleAppData.denied === true ? 'yes' : 'no'} </p> 
    </div>
    <div className='mx-auto'>
      <form className='form-control' onChange={handleCheckbox} onSubmit={formSubmit}>
        <div className='form-control'>
          <label htmlFor="interview" className='cursor-pointer label'>
            <span className='label-text'>Interview</span>
            <input className='checkbox checkbox-secondary' type='checkbox' name='interview' value={false} />
          </label>
        </div>
        <div className='form-control'>
          <label htmlFor="interview" className='cursor-pointer label'>
            <span className='label-text'>Phone Screening</span>
            <input className='checkbox checkbox-secondary' type='checkbox' name='phoneScreening' value={false} />
          </label>
        </div>
        <div className='form-control'>
          <label htmlFor="interview" className='cursor-pointer label'>
            <span className='label-text'>Accepted</span>
            <input className='checkbox checkbox-secondary' type='checkbox' name='accepted' value={false} />
          </label>
        </div>
        <div className='form-control'>
          <label htmlFor="interview" className='cursor-pointer label'>
            <span className='label-text'>Denied / Didn't hear back</span>
            <input className='checkbox checkbox-secondary' type='checkbox' name='denied' value={false} />
          </label>
        </div>  
        <button>submit</button>
      </form>
    </div>
  </>
)
}

export default SingleApp