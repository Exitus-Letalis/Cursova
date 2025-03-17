
import './App.css';
import Log from './Login/login';
import Profile from './profile/profile';
import Sidebar from './sidebar/sidebar';
import Main from './main/mainpage';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
      <Route path='/' element={<Log />}/>
      <Route path='/mainpage' element={<Main  />}/>
      <Route path='/prof' element={<Profile  />}/>
      </Routes >
      </Router>
  );
}

export default App;
