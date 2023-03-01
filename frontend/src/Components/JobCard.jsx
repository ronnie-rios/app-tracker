import { useState } from 'react';
import { useJobs } from '../store/jobContext';
import { useAuth } from '../store/authContext';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/applications`

const JobCard = () => {
  const [buttonDetails, setButtonDetails] =useState(false);
  const { userData } = useAuth();
  const { jobData, setJobData } = useJobs();
  console.log(jobData);
  const postTracker = async (job) => {
    const today = new Date();
    const postedJob = {
      jobRole: job.jobRole,
      company: job.company,
      owner: userData.id,
      dateSubmitted: today
    }
      try {
        const response = await fetch(APP_URL, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userData.token}`
          },
          method: 'POST',
          body: JSON.stringify(postedJob)
        });
        const data = await response.json();
        setTimeout(deletedPostedJob(postedJob.jobRole), 10000);
        setButtonDetails(false)
        return data;
      } catch (error) {
        return error
      }
  }

  const deletedPostedJob = (postedJob) => {
    setJobData(jobData.filter((item) => { 
      return item.jobRole !== postedJob
    }))
  }

  return (
    <>
      {jobData && jobData.map((job) => (
        <div className="p-4 rounded-lg w-96 bg-neutral text-neutral-content" id={job.job_id}>
          <div className="items-left text-left m-4">
            <h2 className="card-title">{job.jobRole}</h2>
            <p className='py-2'>Company: {job.company}</p>
            <p className='py-2'>Description: {job.job_description}</p>
            <div className="card-actions p-2 justify-center">
              <button className="btn btn-sm btn-primary">{job.job_apply_link}</button>
              {buttonDetails === true ? '' : <button onClick={()=>setButtonDetails(true)} className="btn btn-sm btn-ghost">Apply add to tracker?</button>}
              {buttonDetails === true ?
                <>
                  <button onClick={()=>postTracker(job)}>Yes, I applied</button>
                  <button onClick={()=> setButtonDetails(false)}>No I did not</button>
                </> : ''
              }
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default JobCard

