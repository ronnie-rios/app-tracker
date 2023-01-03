import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleApp = () => {
    const [singleAppData, setSingleAppData] = useState([]);
    const [formData, setFormData] = useState({
      interview: false,
      phoneScreening: false,
      accepted: false,
      denied: false
    });
    const id = useParams().id;
    const navigate = useNavigate()
  
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

      const handleCheckbox = (e) => {
        const name = e.target.name;
      
        if (e.target.checked) {
          setFormData((prev)=>{
            return { ...prev, [name]: true}
          })
        } else {
          setFormData((prev)=>{
            return { ...prev, [name]: false}
          })
        }
      }
    
      const formSubmit = (e) => {
        e.preventDefault();
        editData();
        navigate(`/`)
      }

  return (
    <>
        <div>
          <h3>Job info</h3>
          <h4>Role: {singleAppData.jobRole}</h4>
          <h4>Company: {singleAppData.company}</h4>
          <h4>Tech Stack: {singleAppData.technologies}</h4>
          <h4>How'd you hear about this job? {singleAppData.fromWhere}</h4>
          <h3>Job status</h3>
          <h4>Got an interview - {singleAppData.interview && singleAppData.interview.toString()}</h4>
          <h4>Got a phone call - {singleAppData.interview && singleAppData.phoneScreening.toString()}</h4>
          <h4>accepted - {singleAppData.interview && singleAppData.accepted.toString()}</h4>
          <h4>denied / no follow up {singleAppData.interview && singleAppData.denied.toString()}</h4>
        </div>
        <form onChange={handleCheckbox} onSubmit={formSubmit}>
          Interview <input type='checkbox' name='interview' value={false} />
          Phone Screening <input type='checkbox' name='phoneScreening' value={false} />
          Accepted <input type='checkbox' name='accepted'value={true} />
          Denied / Didn't hear back <input type='checkbox' name='denied' value={false}/>
          <button>submit</button>
        </form>
    </>
  )
}

export default SingleApp