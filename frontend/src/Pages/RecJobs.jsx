import React from 'react'
import JobCard from '../Components/JobCard'

const RecJobs = () => {
  return (
    <section className='mx-auto h-screen p-20'>
      <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
        <JobCard />
      </div>
    </section>
  )
}

export default RecJobs