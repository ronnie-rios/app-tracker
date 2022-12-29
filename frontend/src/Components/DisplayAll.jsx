import { useEffect } from 'react';
import { useState } from 'react';
import { EditApp } from './EditApp';

const URL = 'http://localhost:7001/applications'
export const DisplayAll = () => {
    const [appsData, setAppsData] = useState([]);
    const [edit, setEdit] = useState(false)

    const getAllApps = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setAppsData(data);
    }
    useEffect(()=> {
        getAllApps()
    }, []);

    const renderContent = (app) => {
        return (
            <div key={app._id}>
                <h3>role: {app.jobRole}</h3>
                <h3>Company: {app.company}</h3>
                <h4>technologies: {app.technologies}</h4>
                <button onClick={()=>setEdit(true)}>edit?</button>
                {edit && <EditApp appData={appsData}/>}
            </div>
        )
    }
  return (
    <>
        {appsData.map((app) => renderContent(app))}
       
    </>
  )
}
