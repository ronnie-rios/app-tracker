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
            <div className="">
                <h3>{profileData.username}</h3>
                <h3>{profileData.jobDesc}</h3>
                <h3>{profileData.roleLookingFor}</h3>
                <h3>{profileData.overallExperience}</h3>
                <div>
                    {profileData.skills && profileData.skills.map((skill) => {
                        return (
                            <div key={skill.skillName}>
                                <div>{skill.skillName}</div>
                                <div>{skill.years}</div>
                            </div>
                        )
                    })}
                </div>
                <button className='bg-green' onClick={()=> navigate(`/profile/${token.id}`)}>Edit Profile</button>
            </div>
        )
    }
}

export default Profile