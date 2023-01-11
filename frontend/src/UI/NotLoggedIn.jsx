import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div>
        <h3>404: Error, page not found</h3>
        <Link to='/'><button>back to home</button></Link>
    </div>
  )
}

export default NotLoggedIn