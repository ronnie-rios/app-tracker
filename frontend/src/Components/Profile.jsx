import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import NotLoggedIn from '../UI/NotLoggedIn';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/users/profile/63cc741ef26f6a7093bd2017`;

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const { isLoggedIn, token } = useAuth();
    console.log(token)
    const getProfileData = async () => {
        const response = await fetch(APP_URL, {
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
                            <>
                            <div>{skill.skillName}</div>
                            <div>{skill.years}</div>
                            </>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Profile