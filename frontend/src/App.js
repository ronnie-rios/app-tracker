import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage';
import SingleApp from './Components/SingleApp';
import NavBar from './UI/NavBar';

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<SingleApp />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
