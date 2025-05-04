
import './App.css';
import Log from './Login/login';
import Profile from './profile/profile';
import Sidebar from './sidebar/sidebar';
import Main from './main/mainpage';
import Redagprof from './profile/RedagProf';
import Settings from './settings/settings';
import Message from './Message/message';
import Friends from './Friends/friends';
import Createstoris from './createstoris/createpost';
import Chat from './Chat/chat';
import UserProfile from './userprof/userprof';
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
      <Route path='/chat' element={<Chat/>}/>
      <Route path="/profile/:nickName" element={<UserProfile />} />
      </Routes >
      </Router>
  );
}

export default App;
