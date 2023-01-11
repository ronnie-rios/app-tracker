import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage';
import About from './Components/About';
import SingleApp from './Components/SingleApp';
import NavBar from './UI/NavBar';
import Signup from './UI/Signup';
import { AuthProvider } from './store/authContext';

function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/:id' element={<SingleApp />} />
      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
