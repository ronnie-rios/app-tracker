import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditApp } from './EditApp';

const URL = 'http://localhost:7001/applications';

export const DisplayAll = ({ toggleRender, setToggleRender}) => {
    const [appsData, setAppsData] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const navigate = useNavigate();

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
            setToggleRender(!toggleRender)
            return data;
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=> {
        getAllApps()
    }, [toggleRender]);
    
    const renderProgress = (app) => {
      if(app.interview === true) {
        return (
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Interview stage</td>
        )
      } else if (app.phoneScreening === true) {
        return (
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">phone screening</td>
        ) 
      } else if (app.accepted === true) {
        return (
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">accepted!</td>
        ) 
      } else if (app.denied ===true) {
        return (
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">Denied</td>
        ) 
      } else {
        return (
          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">waiting to hear back</td>
        ) 
      }
    }
    const renderContent = (app) => {
        return (
            <tbody key={app._id}>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{app.jobRole}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{app.company}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{app.technologies}</td>
                {renderProgress(app)}
                <td>
                  <button onClick={()=> navigate(`/${app._id}`)}>edit details</button>  
                </td>
                <td>
                  <button onClick={()=> deleteData(app._id)}>delete entry</button>
                </td>
            </tbody>
        )
    }
    
    return (
          <div className='max-w-4xl mx-auto'>
            <div className="flex flex-col">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className='inline-block min-w-full align-middle"'>
                <div className='overflow-hidden'>
                  <table className='min-w-full divide-y divide-gray-200 table-fixed'>
                  <thead className='bg-gray-100 dark:bg-gray-700'>
                    <tr>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Job Role:
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Company
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Technologies Used
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        progress
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Edit
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Delete
                      </th>
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




