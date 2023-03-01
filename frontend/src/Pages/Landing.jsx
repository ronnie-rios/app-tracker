import { useNavigate } from 'react-router-dom';
import job from '../assets/job.svg';
import login from '../assets/login.svg';
import jobapply from '../assets/jobapply.svg';
import profile from '../assets/profile.svg';
import tracking from '../assets/tracking.svg';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <section className=' py-10'>
      <div className='grid max-w-screen-xl mx-auto px-4 py-8 lg:grid-cols-12 '>
          <div className='mr-auto place-self-center lg:col-span-7 p-4'>
              <h1 className='max-w-2xl mb-6 text-4xl font-extrabold text-white'>Track Your Jobs</h1>
              <p className='max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white tracking-wider leading-7'>Having trouble keeping track of jobs you have applied to? Tired of wondering what's happened to your application? </p>
              <p className='max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white tracking-wider'>Job tracker is here to help.</p>
              <button onClick={()=> navigate('/signup')} className='bg-indigo-600 rounded-md p-4 text-white hover:bg-indigo-500 mt-8'>Create an account</button>
          </div>
          <div className=' lg:col-span-5 p-10 hidden md:block'>
            <img src={job} alt="Job Image" className='w-120 h-120'></img>
          </div>
      </div>
    <section className='grid md:grid-cols-3 max-w-screen-xl mx-auto justify-items-center gap-4 p-5 bg-gray-700 border rounded-lg border-gray-700'>
     <div className='md:col-span-3'>
            <h2 className='m-4 text-4xl font-extrabold text-white'>How it Works</h2>
        </div>
     
       <div className=' p-10'>
            <img src={login} alt="Login" className='h-40 w-40 mb-6'></img>
            <p className='text-xl text-white'>1. Create an account.</p>
       </div>
       <div className=' p-10 '>
            <img src={jobapply} alt="jobapply" className='h-40 w-40  mb-6 ml-12'></img> 
            <p className='text-xl text-white'>2. Add jobs you have applied to.</p>
       </div>
       <div className=' p-10'>
            <img src={tracking} alt="tracking" className='h-40 w-40 mb-6'></img>
            <p className='text-xl text-white mt-4'>3. Track your progress.</p>
       </div>
    </section>
    <div className='grid md:grid-cols-3 max-w-screen-xl mx-auto justify-items-center mt-20 p-10'>
          <div className='col-span-1 p-10 hidden md:block'>
            <img src={profile} alt="profile" className='w-120 h-120 mb-6'></img>
          </div>
          <div className='md:col-span-2 md:col-start-2 '>
            <h2 className='text-3xl font-bold text-white border-b-2 border-gray-700 pb-4'>Coming Soon</h2>
            <ul>
                <li className='text-white my-4 text-lg text-wide'><span className='font-bold'>Profile Feature:</span> Add your job experience and skills.</li>
                <li className='text-white my-4 text-lg text-wide'><span className='font-bold'>Job Recommendations:</span> Artificial intelligence will recommend you jobs based on your profile.</li>
            </ul>
          </div>
          
      </div>
    </section>
  )
}

export default Landing