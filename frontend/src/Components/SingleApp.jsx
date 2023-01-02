import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleApp = () => {
    const [singleAppData, setSingleAppData] = useState([]);
    const id = useParams().id
  
    const getSingleApp = async () => {
        const response = await fetch(`http://localhost:7001/applications/${id}`);
        const data = await response.json();
        setSingleAppData(data);
    }
    useEffect(()=> {
        getSingleApp()
    }, []);

  return (
    <div>SingleApp</div>
  )
}

export default SingleApp