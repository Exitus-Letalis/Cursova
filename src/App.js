
import './App.css';
import Log from './Login/login';
import Profile from './profile/profile';
import Sidebar from './sidebar/sidebar';
import Main from './main/mainpage';
import Redagprof from './profile/RedagProf';
import Settings from './settings/settings';
import Message from './Message/message';
import Friends from './Friends/friends';
import Createstoris from './createstoris/createstoris';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
      <Route path='/' element={<Log />}/>
      <Route path='/mainpage' element={<Main  />}/>
      <Route path="/prof" element={<Profile  />}/>
      <Route path='/redagprof' element={<Redagprof/>}/>
      <Route path="/settings" element={<Settings />} />
      <Route path='/message' element={<Message/>}/>
      <Route path='/friends' element={<Friends/>}/>
      <Route path='/createstoris' element={<Createstoris/>}/>
      </Routes >
      </Router>
  );
}

export default App;
