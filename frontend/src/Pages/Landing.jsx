import { useNavigate } from 'react-router-dom';
import job from '../assets/job.svg';
import login from '../assets/login.svg';
import jobapply from '../assets/jobapply.svg';
import resume from '../assets/jobresume.svg';
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
    <div className='grid md:grid-cols-3 max-w-screen-xl mx-auto justify-items-center'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold '>Call to action</h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus totam consectetur dignissimos earum adipisci maiores incidunt ipsam a dolor obcaecati!</p>
            <button onClick={()=> navigate('/login')} className='bg-gray-700 rounded-md p-4 text-white hover:bg-gray-500'>Get Started</button>
          </div>
          <div className='hidden lg:col-span-5'>
          </div>
          
      </div>
    </section>
  )
}

export default Landing