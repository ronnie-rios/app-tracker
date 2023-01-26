import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import NotLoggedIn from '../UI/NotLoggedIn';
import EditSkills from './EditSkills';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/`;

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [editSkills, setEditSkills] = useState(false);

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
    },[])
    const { username, roleLookingFor, idealCompany, jobLevel, previousRole, workType, education, salary, overallExperience, skills } = profileData
   console.log(profileData)
    //render content
    if (isLoggedIn === false) {
        return (
            <NotLoggedIn />
        )
    } else {
        return (
            <div className="max-w-screen-lg mx-auto m-10">
                <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 p-8 mb-8 md:gap-8'>
                    <div className='card col-span-1'>
                        <h3>Profile Section</h3>
                        <h3 className='card-title'>{username}</h3>
                        <button onClick={()=>navigate(`/profile/:${token.id}`)}>Edit Profile</button>
                    </div>
                    <div className='col-span-2  border rounded-md border-sky-200 p-4'>
                        <h3 className='mb-2 text-xl font-semibold text-white'>In my next role I'm looking for. . .</h3>
                        <h3>Role: </h3>
                        <h3>{roleLookingFor}</h3>
                        <h3>My work setting preference is: </h3>
                        <h3>{workType}</h3>
                        <h3>Ideal salary:</h3>
                        <h3>{salary}</h3>
                        <h3>Experience level</h3>
                        <h3>{jobLevel}</h3>
                        <h3>My dream company is: </h3>
                        <h3>{idealCompany}</h3>
                    </div>
                    <div className='col-start-2 col-span-2  border rounded-md border-sky-200 p-4'>
                        <h3 className='mb-2 text-xl font-semibold text-white'>Work Experience</h3>
                        <h3>My current or previous role: </h3>
                        <h3>{previousRole}</h3>
                        <h3>Years of experience: </h3>
                        <h3>{overallExperience}</h3>

                    </div>
                <div className='col-start-2 col-span-2 border rounded-md border-sky-200 p-4 '>
                    <h3 className='mb-2 text-xl font-semibold text-white'>Skills</h3>
                    {skills && skills.map((skill) => {
                        return (
                            <ul key={skill.id} className='space-y-1 text-white list-disc list-inside m-2'>
                                <li className='text-lg'>{skill.skillName} - {skill.years} year(s)</li>
                            </ul>
                        )
                    })}
                    {editSkills ? '' : <button className='btn' onClick={()=> setEditSkills(true)}>Add skills</button>}
                    <div>
                        {editSkills ? <EditSkills editSkills={editSkills} setEditSkills={setEditSkills}/> : ''}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Profile;

