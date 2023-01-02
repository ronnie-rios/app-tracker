import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage';
import SingleApp from './Components/SingleApp';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<SingleApp />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
