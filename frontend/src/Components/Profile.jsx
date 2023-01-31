import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import NotLoggedIn from '../UI/NotLoggedIn';
import EditSkills from './EditSkills';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/`;
const SKILL_URL = `${URL}/users/profile/edit/`;

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [editSkills, setEditSkills] = useState(false);
    const [toggleRender, setToggleRender] = useState(false);
    const { isLoggedIn, token } = useAuth();
    const navigate = useNavigate();

    const getProfileData = async () => {
        const response = await fetch(APP_URL+ token.id, {
            headers:{
            'Authorization': `bearer ${token.token}`
            }, 
            method: 'GET',
        })
        const data = await response.json();
        setProfileData(data);
    }
    useEffect(() => {
        getProfileData()
    },[toggleRender]);
   
    const { username, roleLookingFor, idealCompany, jobLevel, previousRole, workType, jobDesc, salary, overallExperience, skills } = profileData
   
    const removeSkill = async (id) => {
        try {
          const response = await fetch(SKILL_URL + token.id+'/skills/'+ id, {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token.token}`
            },
            method: 'DELETE',
          });
          const data = response.json(); 
          setToggleRender(!toggleRender)   
          return data
        } catch (error) {
          return error
        }
      }
      
    //render content
    if (isLoggedIn === false) {
        return (
            <NotLoggedIn />
        )
    } else {
        return (
            <div className="mx-auto my-5 mx-15 p-10">
                <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 p-8 mb-8 md:gap-4'>
                    <div className='card col-span-1 m-4'>
                        <h1 className='text-white text-2xl my-4'>Profile</h1>
                        <p className='card-title text-lg my-4'>Welcome {username}</p>
                        <button className='btn btn-sm btn-outline max-w-sm' onClick={()=>navigate(`/profile/:${token.id}`)}>Edit Profile</button>
                    </div>
                    
                    <div className='md:col-start-2 md:col-span-2 m-4 border rounded-md border-white p-4'>
                        <h3 className='mb-2 text-xl font-semibold text-white'>In my next role I'm looking for. . .</h3>
                        <div className='grid md:grid-cols-2'>
                            <div>
                                <p className='text-white '>Role: </p>
                                <p>{roleLookingFor}</p>
                                <p className='text-white '>Jobs with an experience level of:</p>
                                <p>{jobLevel}</p>
                            </div>
                            <div>   
                                <p className='text-white  '>My work setting preference is: </p>
                                <p>{workType}</p>
                                <p className='text-white '>Ideal salary: ${salary}</p> 
                                <p className='text-white'>My dream company is: </p>
                                <p>{idealCompany}</p>
                            </div>
                        </div>
                    </div>
                    <div className="m-4">
                        <p className='text-white my-4 text-xl'>My user summary:</p>
                        <p>{jobDesc}</p>
                    </div>
                    <div className='md:col-start-2 md:col-span-2 m-4 border rounded-md border-white p-4'>
                        <h2 className='mb-2 text-xl font-semibold text-white '>Work Experience</h2>
                        <p className='text-white '>My current or previous role: </p>
                        <p>{previousRole}</p>
                        <p className='text-white '>Years of experience: </p>
                        <p>{overallExperience} year(s)</p>
                    </div>
                <div className='md:col-start-2 md:col-span-2 m-4 border rounded-md border-white p-4 '>
                    <h3 className='mb-2 text-xl font-semibold text-white'>Skills</h3>
                    {!editSkills 
                     && skills && skills.map((skill) => {
                        return (
                            <ul key={skill._id} className='space-y-1 list-disc list-inside m-2'>
                                <li className='text-lg'>{skill.skillName} - {skill.years} year(s)
                                    <AiOutlineCloseCircle 
                                    className=' text-white hover:text-red-600 float-right'
                                    onClick={() => removeSkill(skill._id)}
                                    />
                                </li>
                                
                            </ul>
                        )
                    })}
                
                    {!editSkills && <button className='btn btn-sm' onClick={()=> setEditSkills(true)}>Add skills</button>}
                    <div>
                        {editSkills && <EditSkills toggleRender={toggleRender} setToggleRender={setToggleRender} setEditSkills={setEditSkills}/> }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Profile;

