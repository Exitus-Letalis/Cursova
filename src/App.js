
import './App.css';
import Log from './Welcome/Login/login';
import Reg from './Welcome/Regis/reg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Log />}/>
      <Route path='/reg' element={<Reg />}/>
      </Routes>
      </Router>
  );
}

export default App;
