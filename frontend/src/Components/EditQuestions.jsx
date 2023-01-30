import { useState } from 'react'
import { useAuth } from '../store/authContext';
import { useNavigate } from 'react-router-dom';
const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/edit/`;

const EditQuestions = () => {
  const [formData, setFormData] = useState({
    roleLookingFor: '',
    idealCompany: '',
    jobLevel: '',
    previousRole: '',
    workType: '',
    overallExperience: '',
    education: '',
    salary: 0,
    workCitizen: ''
  });
  const { token } = useAuth();
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
    const response = await fetch(APP_URL + token.id, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token.token}`
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
    <div className='w-full max-w-2xl mx-auto p-10'>
      <div className='form-control p-10 border border-gray-200 rounded-lg'>
        <h2>Please answer the questions to the best of your ability. We will use this data to match you to relevant jobs</h2>
        <form onChange={formHandler} onSubmit={formSubmit}>
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
            <label className='block text-lg text-white mb-2'>What type of jobs do you want to apply for?</label>
            <label className='block text-lg text-white mb-2'>Entry Level (0 - 1 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='0-1 years'
              checked={formData.jobLevel === '0-1 years'}
              //onChange={formHandler}
              />
            <label className='block text-lg text-white mb-2'>Early Career Level (2-5 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='2-5 years'
              checked={formData.jobLevel === '2-5 years'}
              
              />
            <label className='block text-lg text-white mb-2'>Mid-Level (5-7 years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='5-7 years'
              checked={formData.jobLevel === '5-7 years'}
              
              />
           <label className='block text-lg text-white mb-2'>Senior Level (7+ years)</label>
            <input
              className='radio' 
              type='radio'
              name='jobLevel'
              value='7 years'
              checked={formData.jobLevel === '7 years'}
              
            />
          </div>
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
            <label className='block text-lg text-white mb-2'>Type of work? Remote, Hybrid, In Office:</label>
            <label className='block text-lg text-white mb-2'>Remote</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='remote'
              checked={formData.workType === 'remote'}
            />
            <label className='block text-lg text-white mb-2'>Hybrid</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='hybrid'
              checked={formData.workType === 'hybrid'}
            />
            <label className='block text-lg text-white mb-2'>In Office</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='office'
              checked={formData.workType === 'office'}
            />
            <label className='block text-lg text-white mb-2'>No preference</label>
            <input
              className='radio' 
              type='radio'
              name='workType'
              value='any'
              checked={formData.workType === 'any'}
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Overall professional experience?</label>
            <input
              className='input-group shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='number'
              name='overallExperience'          
            />
              <span>Years</span>
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
            <label className='block text-lg text-white font-bold mb-2'>Ideal salary:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline' 
              type='number'
              name='salary'
              
            />
          </div>
          <div className="mb-4">
            <label className='block text-lg text-white mb-2'>Work status?</label>
            <label className='block text-lg text-white mb-2'>U.S. Citizen</label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='US citizen'
              checked={formData.workCitizen === 'US citizen'}
            />
            <label className='block text-lg text-white mb-2'>Will require sponsorship.</label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='sponsorship'
              checked={formData.workCitizen === 'sponsorship'}
            />
            <label className='block text-lg text-white mb-2'>H-1B </label>
            <input
              className='radio' 
              type='radio'
              name='workCitizen'
              value='H-1B'
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