import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import AddJob from '../UI/AddJob';

const URL = process.env.REACT_APP_BASEURL;
const APP_URL = `${URL}/applications/`;

const tableArr = ['Date Submitted', 'Job Role', 'Company', 'Technologies Used', 'Application Status', 'Edit', 'Delete']
export const DisplayAll = ({ toggleRender, setToggleRender}) => {
  const [appsData, setAppsData] = useState([]);
 
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate(); 
  
  const getAllApps = async () => {
    const response = await fetch(APP_URL, {
      headers:{
        'Authorization': `bearer ${token.token}`
      }, 
      method: 'GET',
    })
    const data = await response.json();
    setAppsData(data);
  }
  const deleteData = async (id) => {
    try {
      const response = await fetch(APP_URL + id, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token.token}`
        },
        method: 'DELETE',
      });
        const data = await response.json();
        setToggleRender(!toggleRender)
        return data;
    } catch (error) {
      return error
    }
  }

  useEffect(()=> {
      getAllApps()
  }, [toggleRender, isLoggedIn]);

  const renderProgress = (app) => {
    if(app.interview === true) {
      return (
        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Interview Stage</td>
      )
    } else if (app.phoneScreening === true) {
      return (
        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Phone Screening</td>
      ) 
    } else if (app.accepted === true) {
      return (
        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Accepted!</td>
      ) 
    } else if (app.denied ===true) {
      return (
        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Denied</td>
      ) 
    } else {
      return (
        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Submitted</td>
      ) 
    }
  }

  const renderContent = (app) => {
    const date = new Date(app.dateSubmitted)
  
      return (
        <tbody key={app._id} className='bg-white rounded-md'>
            <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{app.dateSubmitted === 'Invalid Date' ? 'missing date' :date.toLocaleDateString()}</td>
            <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{app.jobRole}</td>
            <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{app.company}</td>
            <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{app.technologies}</td>
            {renderProgress(app)}
            <td className="py-4 px-4">
              <button className='bg-green-600 rounded px-3 py-1 text-white hover:bg-green-800' onClick={()=> navigate(`/${app._id}`)}>edit</button>  
            </td>
            <td className="py-4 px-4">
              <button className='bg-red-600 rounded px-3 py-1 text-white hover:bg-red-800' onClick={()=> deleteData(app._id)}>delete</button>
            </td>
        </tbody>
      )
  }
  if (appsData.length ===0) {
    return <AddJob />
  } else {
  return (
    <div className='max-w-6xl mx-auto'>
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className='inline-block min-w-full align-middle"'>
          <div className='overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-600 table-fixed lg:table-auto md:table-auto sm:table-auto'>
            <thead className='bg-gray-100 dark:bg-gray-700'>
              <tr>
                {tableArr.map((tableHeading) =>  (
                  <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                    {tableHeading}
                  </th>
                ))}
              </tr>
            </thead>
            {appsData.map((app) => renderContent(app))}
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
  }
}




