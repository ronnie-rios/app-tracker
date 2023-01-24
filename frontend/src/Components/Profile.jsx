import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import NotLoggedIn from '../UI/NotLoggedIn';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/`;

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
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
    const { username, jobDesc, roleLookingFor, overallExperience, skills } = profileData
    useEffect(() => {
        getProfileData()
    },[])

    //render content
    if (isLoggedIn === false) {
        return (
            <NotLoggedIn />
        )
    } else {
        return (
            <div className="max-w-screen-xl mx-auto m-10">
                <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 p-8 mb-8 md:gap-8'>
                    <div className='card col-span-1'>
                        <h3>Profile Section</h3>
                        <h3 className='card-title'>{username}</h3>
                        <button className='bg-green' onClick={()=> navigate(`/profile/${token.id}`)}>Edit Profile</button>
                    </div>
                    <div className='col-span-2  border rounded-md border-sky-200 p-4'>
                        <h3>Job looking for</h3>
                        <h3>{jobDesc}</h3>
                        <h3>{roleLookingFor}</h3>
                        <h3>{overallExperience}</h3>

                    </div>
                <div className='col-start-2  col-span-2 border rounded-md border-sky-200 p-4'>
                    {skills && skills.map((skill) => {
                        return (
                            <>
                            <div key={skill.skillName}>
                                <p>{skill.skillName}</p>
                                <p>{skill.years}</p>
                            </div>
                            </>
                        )
                    })}
                </div>
                </div>
            </div>
        )
    }
}

export default Profile