import { useState} from 'react'
import { DisplayAll } from './DisplayAll'
import { PostApp } from './PostApp'

const HomePage = () => {
  const [toggleRender, setToggleRender] = useState(false);
  const [viewForm, setViewForm] = useState(false);

  return (
    <div>
        <div className='w-full max-w-xs py-6 px-4'>
          <button onClick={()=> setViewForm(true)}>Add a job</button>
          {viewForm && 
            <div className='shadow-md roundex px-8 pt=6 pb-8 mb-4'>
              <button onClick={()=> setViewForm(false)}>nevermind</button>
              <PostApp toggleRender={toggleRender} setToggleRender={setToggleRender}/>
            </div>
          }
        </div>
        <DisplayAll toggleRender={toggleRender} setToggleRender={setToggleRender}/>
    </div>
  )
}

export default HomePage