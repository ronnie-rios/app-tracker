import { useState} from 'react'
import { DisplayAll } from './DisplayAll'
import { PostApp } from './PostApp'

const HomePage = () => {
  const [toggleRender, setToggleRender] = useState(false)

  return (
    <div className='flex'>
        <PostApp toggleRender={toggleRender} setToggleRender={setToggleRender}/>
        <DisplayAll toggleRender={toggleRender} setToggleRender={setToggleRender}/>
    </div>
  )
}

export default HomePage