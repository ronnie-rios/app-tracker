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
    <div>
        <h4>{singleAppData.jobRole}</h4>
        <h4>{singleAppData.company}</h4>
        <h4>{singleAppData.technologies}</h4>
        <h4>{singleAppData.fromWhere}</h4>
        <h4>{singleAppData.interview}</h4>
        <h4>{singleAppData.phoneScreening}</h4>
        <h4>{singleAppData.accepted}</h4>
        <h4>{singleAppData.denied}</h4>
    </div>
  )
}

export default SingleApp