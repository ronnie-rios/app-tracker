import { useState} from 'react'
import { DisplayAll } from './DisplayAll'
import { PostApp } from './PostApp'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const HomePage = () => {
  const [toggleRender, setToggleRender] = useState(false);
  const [viewForm, setViewForm] = useState(false);

  return (
    <div>
        <div className='w-full max-w-xs py-6 px-4'>
          <button className='bg-green-600 rounded px-3 pb-1 mb-8 text-white hover:bg-green-800' onClick={()=> setViewForm(true)}>Add a job</button>
          {viewForm && 
            <div className='shadow-md rounded relative px-8 pt-6 pb-8 mb-4'>
              <AiOutlineCloseCircle 
                className=' text-gray-800 hover:text-red-600 float-right'
                onClick={()=> setViewForm(false)}
              />
              <PostApp toggleRender={toggleRender} setToggleRender={setToggleRender}/>
            </div>
          }
        </div>
        <DisplayAll toggleRender={toggleRender} setToggleRender={setToggleRender}/>
    </div>
  )
}

export default HomePage