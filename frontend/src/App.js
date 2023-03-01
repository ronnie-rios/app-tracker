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
import RecJobs from './Pages/RecJobs';
import { JobProvider } from './store/jobContext';
import Landing from './Pages/Landing';

function App() {
  return (
    <>
    <AuthProvider>
    <JobProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<About />} />
        <Route path='/home' element={<HomePage />} />
        {/* <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<EditQuestions />} /> */}
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/jobrec' element={<RecJobs />} /> */}
        <Route path='/:id' element={<SingleApp />} />
      </Routes>
    </Router>
      <Footer />
    </JobProvider>
    </AuthProvider>
    </>
  );
}

export default App;
