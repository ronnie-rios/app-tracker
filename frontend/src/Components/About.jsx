import Login from '../UI/Login';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const navigate = useNavigate()
  return (
    <div>
        <h1>Job trcker</h1>
        <p>welcome to Job Tracker</p>
        <button onClick={()=> navigate('/signup')} className='py-1 px-4 rounded bg-blue-800 font-bold text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline'>Click to signup</button>
        <Login />
    </div>
  )
}

export default About