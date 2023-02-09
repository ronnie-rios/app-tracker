import { useState } from 'react'
import JobCard from '../Components/JobCard'
import { useAuth } from '../store/authContext';
import { useJobs } from '../store/jobContext';

const RecJobs = () => {
  const [recJobs, setRecJobs] = useState([]);
  const { userData } = useAuth();
  const { jobData, setJobData } = useJobs();
  
  const getJobData = async () => {
    try {
      const response = await fetch('http://localhost:3001/rec', {
        headers: { 
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userData) //destructure?
      });
      const data = await response.json();
      setJobData(data)
    } catch (error) {
      return error
    }
  }
  const buttonHandler = () => {
    getJobData();
  };

  const addToTracker = () => {

  }
  return (
    <section className='mx-auto h-auto p-20 '>
      <h1 className='text-2xl pb-4 '>Recommended Jobs</h1>
      {jobData.length === 0 ? <button className='btn btn-sm btn-primary' onClick={buttonHandler}>Find jobs</button> : ''}
      
      <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
        <JobCard addToTracker={addToTracker}/>
      </div>
    </section>
  )
}

export default RecJobs