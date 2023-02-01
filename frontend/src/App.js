import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage';
import About from './Components/About';
import SingleApp from './Components/SingleApp';
import NavBar from './UI/NavBar';
import Signup from './UI/Signup';
import { AuthProvider } from './store/authContext';
import Profile from './Components/Profile';
import EditQuestions from './Components/EditQuestions';
import Footer from './UI/Footer';

function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<EditQuestions />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<About />} />
        <Route path='/:id' element={<SingleApp />} />
      </Routes>
    </Router>
      <Footer />
    </AuthProvider>
    </>
  );
}

export default App;
