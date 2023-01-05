import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditApp } from './EditApp';

const URL = 'http://localhost:7001/applications';

export const DisplayAll = () => {
    const [appsData, setAppsData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [viewMore, setViewMore] = useState(false);


    const getAllApps = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setAppsData(data);
    }

    const deleteData = async (id) => {
        try {
          const response = await fetch(`http://localhost:7001/applications/${id}`, {
            headers: { 
              'Content-Type': 'application/json'
            },
            method: 'DELETE',
          });
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=> {
        getAllApps()
    }, []);

    const renderContent = (app) => {
        return (
            <div key={app._id}>
                <button onClick={()=> deleteData(app._id)}>delete entry</button>
                <h3>role: {app.jobRole}</h3>
                <h3>Company: {app.company}</h3>
                <h4>technologies: {app.technologies}</h4>
                <button onClick={()=> setViewMore(true)}>view more details</button>
                {viewMore && 
                <>
                    <p>Interview: {app.interview === true ? 'yes' : 'no'} </p>
                    <p>Phone Call: {app.phoneScreening === true ? 'yes' : 'no'} </p>
                    <p>Accepted: {app.accepted === true ? 'yes' : 'no'}  </p>
                    <p>Denied: {app.denied === true ? 'yes' : 'no'} </p> 
                    <button onClick={()=> setViewMore(false)}>close</button>
                </>
                }
                <button onClick={()=> setEdit(true)}>edit details</button>
                {edit && <EditApp appData={app}/>}
            </div>
        )
    }
    
    return (
        <>
            {appsData.map((app) => renderContent(app))}
        </>
    )
}
