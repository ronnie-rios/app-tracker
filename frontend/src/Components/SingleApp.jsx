import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext'

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/applications/`;

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
      const response = await fetch(APP_URL + id, {
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
      const response = await fetch(APP_URL + id, {
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
  <section className='flex flex-row min-h-screen justify-center items-center'>
  <main className='w-full max-w-md p-4 border rounded-lg shadow-md sm:p-8'>
    <h3 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Job Info</h3>
    <ul className='flow-root'>
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Role: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.jobRole}</div>
        </div>
      </li>
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Company: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.company}</div>
        </div>
      </li>
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Tech Stack: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.technologies}</div>
        </div>
      </li>
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Interview: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.interview === true ? 'yes' : 'no'}</div>
        </div>
      </li>
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Phone Call: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.phoneScreening === true ? 'yes' : 'no'}</div>
        </div>
      </li> 
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Accepted: </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.accepted === true ? 'yes' : 'no'}</div>
        </div>
      </li> 
      <li className='py-3 sm:py-2'>
        <div className="flex items-center space-x-4">
        <div className="flex-1 min-1-0">
          <p className="text-lg font-medium truncate">Denied </p>
        </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{singleAppData.denied === true ? 'yes' : 'no'}</div>
        </div>
      </li> 
    </ul>
    <div className='mx-auto'>
      <h3 className='text-2xl text-white text-bold font-medium pb-2'>Edit your application progress.</h3>
      <p className="text-lg font-medium truncate pb-2">Please select one option.</p>
      <form className='form-control' onChange={handleCheckbox} onSubmit={formSubmit}>
        <div className='flex items-center pl-4 border border-gray-200 rounded'>
          <input className='w-5 h-5 px-4 text-blue-600 bg-white border-gray-300 rounded hover:test-white focus:ring-blue-500' type='checkbox' name='interview' value={false} />
          <label htmlFor="interview" className='w-full py-4 ml-2 text-md font-medium'>Interview</label>
        </div>
        <div className='flex items-center pl-4 border border-gray-200 rounded'>
            <input className='w-5 h-5 px-4 text-blue-600 bg-white border-gray-300 rounded hover:test-white focus:ring-blue-500' type='checkbox' name='phoneScreening' value={false} />
          <label htmlFor="interview" className='w-full py-4 ml-2 text-md font-medium'>Phone Screening</label>
        </div>
        <div className='flex items-center pl-4 border border-gray-200 rounded'>
            <input className='w-5 h-5 px-4 text-blue-600 bg-white border-gray-300 rounded hover:test-white focus:ring-blue-500' type='checkbox' name='accepted' value={false} />
          <label htmlFor="interview" className='w-full py-4 ml-2 text-md font-medium'>Accepted</label>
        </div>
        <div className='flex items-center pl-4 border border-gray-200 rounded'>
            <input className='w-5 h-5 px-4 text-blue-600 bg-white border-gray-300 rounded hover:test-white focus:ring-blue-500' type='checkbox' name='denied' value={false} />
          <label htmlFor="interview" className='w-full py-4 ml-2 text-md font-medium'>Denied / Didn't hear back</label>
        </div>  
        <button className='mt-4 py-1 rounded bg-blue-700 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Submit</button>
      </form>
    </div>
  </main>
  </section>
)
}

export default SingleApp