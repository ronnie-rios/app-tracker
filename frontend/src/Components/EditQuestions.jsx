import { useState } from 'react'
import { useAuth } from '../store/authContext';
import { useNavigate } from 'react-router-dom';
const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/edit/`;

const EditQuestions = () => {
  const [formData, setFormData] = useState({
    roleLookingFor: '',
    idealCompany: '',
    jobDesc: '',
    jobLevel: '',
    previousRole: '',
    workType: '',
    overallExperience: '',
    education: '',
    salary: 0,
    workCitizen: ''
  });
  const { userData } = useAuth();
  const navigate = useNavigate(); 

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value}
    })
  }
 console.log(formData)

 const formSubmit = (e) => {
  e.preventDefault();
  postData();
}

const postData = async () => {
  try {
    const response = await fetch(APP_URL + userData.id, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `bearer ${userData.token}`
      },
      method: 'PUT',
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    navigate('/profile')
    return data
  } catch (error) {
    return error
  }
} 
  return (
    <div className='w-full max-w-4xl mx-auto p-6'>
      <div className=' p-10'>
        <h2 className='text-2xl'>Please answer the questions to the best of your ability. We will use this data to match you to relevant jobs.</h2>
        <form onChange={formHandler} onSubmit={formSubmit} className='form-control pt-4'>
          <div className="mb-4">
              <label className='block text-lg text-white mb-2'>Current (or previous) Role / Title:</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
                type='text'
                name='previousRole'
                placeholder="ex: software engineer"
                required
              />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Overall professional experience?</label>
            <input
              className='input-group shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='number'
              name='overallExperience'   
              min={0}       
            />
              <span>Years</span>
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Briefly summarize your experience.</label>
            <textarea
              className='"textarea textarea-bordered textarea-lg w-full shadow appearance-none border rounded  py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='textarea'
              name='jobDesc'
              placeholder='ex: Worked on optimizing front end components.'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Enter the role you are looking for:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='text'
              name='roleLookingFor'
              required
              placeholder='ex: frontend engineer'
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Enter your location:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='text'
              name='location'
              required
              placeholder='ex: Texas, USA'
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>What is your dream company?</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='text'
              name='idealCompany'
              placeholder='ex: Google, Microsoft, etc.'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Highest education achieved?</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='text'
              name='education'
              
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Ideal salary:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='number'
              name='salary'
              min={0}
            />
          </div>
          <label className='text-lg text-white mb-4'>What type of jobs do you want to apply for?</label>
          <div className="mb-4 grid grid-cols-4 mt-4 content-center">
            <label className='block text-md mb-2'>Entry Level (0 - 1 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='0-1 years'
              checked={formData.jobLevel === '0-1 years'}
              //onChange={formHandler}
              />
            <label className='block text-md mb-2'>Early Career Level (2-5 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='2-5 years'
              checked={formData.jobLevel === '2-5 years'}
              
              />
            <label className='block text-md mb-2'>Mid-Level (5-7 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='5-7 years'
              checked={formData.jobLevel === '5-7 years'}
              
              />
           <label className='block text-md mb-2'>Senior Level (7+ years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='7 years'
              checked={formData.jobLevel === '7 years'}
              
            />
          </div>
         
          <label className='block text-lg text-white mb-2'>Type of work? Remote, Hybrid, In Office:</label>
          <div className="my-4 grid grid-cols-4 content-center">
            <label className='block text-md mb-2'>Remote</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='remote'
              checked={formData.workType === 'remote'}
            />
            <label className='block text-md mb-2'>Hybrid</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='hybrid'
              checked={formData.workType === 'hybrid'}
            />
            <label className='block text-md mb-2'>In Office</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='office'
              checked={formData.workType === 'office'}
            />
            <label className='block text-md mb-2'>No preference</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='any'
              checked={formData.workType === 'any'}
            />
          </div>  
          <label className='block text-lg text-white mb-2'>Work status?</label>
          <div className="my-4 grid grid-cols-4 content-center">
            <label className='block text-md mb-2'>U.S. Citizen</label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='US citizen'
              checked={formData.workCitizen === 'US citizen'}
            />
            <label className='block text-md mb-2'>Will require sponsorship.</label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='sponsorship'
              checked={formData.workCitizen === 'sponsorship'}
            />
            <label className='block text-md mb-2'>H-1B </label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='H-1B'
              checked={formData.workCitizen === 'H-1B'}
            />
            <label className='block text-md mb-2'>International Student </label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='international-student'
              checked={formData.workCitizen === 'H-1B'}
            />
          </div>
          <button className='py-1 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditQuestions