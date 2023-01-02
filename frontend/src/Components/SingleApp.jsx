import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleApp = () => {
    const [singleAppData, setSingleAppData] = useState([]);
    const [formData, setFormData] = useState({});
    const id = useParams().id
  
    const getSingleApp = async () => {
        const response = await fetch(`http://localhost:7001/applications/${id}`);
        const data = await response.json();
        setSingleAppData(data);
    }
    useEffect(()=> {
        getSingleApp()
    }, []);

    const editData = async () => {
        try {
          const response = await fetch(`http://localhost:7001/applications/${id}`, {
            headers: { 
              'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(formData)
          });
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error)
        }
      }

      const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev)=>{
          return { ...prev, [name]: value}
        })
      }
    
      const formSubmit = (e) => {
        e.preventDefault();
        editData();
      }
  return (
    <>
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
        <form>

        </form>
    </>
  )
}

export default SingleApp