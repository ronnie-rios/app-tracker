import { useJobs } from '../store/jobContext';


const JobCard = () => {
  const { jobData } = useJobs()
  return (
    <>
      {jobData && jobData.map((job) => (
        <div className="p-4 rounded-lg w-96 bg-neutral text-neutral-content" id={job.job_id}>
        <div className="items-left text-left m-4">
          <h2 className="card-title">{job.jobRole}</h2>
          <p>Company: {job.company}</p>
          <p>Description: {job.job_description}</p>
          <div className="card-actions p-2 justify-center">
            <button className="btn btn-sm btn-primary">{job.job_apply_link}</button>
            <button className="btn btn-sm btn-ghost">Apply add to tracker?</button>
          </div>
        </div>
      </div>
      ))}
    </>
  )
}

export default JobCard

