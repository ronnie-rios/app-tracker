import Login from '../UI/Login';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className='text-5xl font-bold'>Job trcker</h1>
          <p className='py-6'>welcome to Job Tracker</p>
          <Login />
          <p className='py-6'>Don't have an account, sign up below</p>
          <button onClick={()=> navigate('/signup')} className='btn btn-primary'>Click to signup</button>
        </div>
      </div>
    </div>
  )
}

export default About