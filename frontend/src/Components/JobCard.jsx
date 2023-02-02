import React from 'react'

const jobArr = [
  {
    job_id: 1,
    employer_name : 'fake company',
    job_title: 'job title',
    job_apply_link: 'link',
    job_description: 'the job desc'
  },
  {
    job_id: 2,
    employer_name : 'fake company2',
    job_title: 'job title2',
    job_apply_link: 'link',
    job_description: 'the job desc'
  },
  {
    job_id: 3,
    employer_name : 'fake company3',
    job_title: 'job title3',
    job_apply_link: 'link',
    job_description: 'the job desc'
  },
  {
    job_id: 4,
    employer_name : 'fake company4',
    job_title: 'job title4',
    job_apply_link: 'link',
    job_description: 'the job desc'
  }
]
const JobCard = () => {
  return (
    <>
      {jobArr && jobArr.map((job) => (
        <div className="p-4 rounded-lg w-96 bg-neutral text-neutral-content" id={job.job_id}>
        <div className="items-left text-left m-4">
          <h2 className="card-title">{job.job_title}</h2>
          <p>Company: {job.job_description}</p>
          <p>Description: {job.job_description}</p>
          <div className="card-actions p-4 justify-center">
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

// field_names= [
//     'employer_name',
//     'employer_logo',
//     'employer_website',
//     'job_publisher',
//     'job_id',
//     'job_employment_type',
//     'job_title',
//     'job_apply_link',
//     'job_description',
//     'job_is_remote',
//     'job_posted_at_timestamp',
//     'job_posted_at_datetime_utc',
//     'job_city',
//     'job_state',
//     'job_country',
//     'job_latitude',
//     'job_longitude',
//     'job_benefits',
//     'job_google_link',
//     'job_offer_expiration_datetime_utc',
//     'job_offer_expiration_timestamp',
//     'job_required_experience',
//     'job_required_skills',
//     'job_required_education',
//     'job_experience_in_place_of_education',
//     'job_min_salary',
//     'job_max_salary',
//     'job_salary_currency',
//     'job_salary_period',
//     'job_highlights'
//     ]