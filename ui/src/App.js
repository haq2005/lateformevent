import './App.css';
import 'react-bootstrap-icons'
import Guestregister from './Registrationpages/Gregister';
import Cregister from './Registrationpages/Cregister';

import Home from './Registrationpages/Home';
import Faq from './Registrationpages/Faq';
import Glogin from './Registrationpages/Glogin';
import Clogin from './Registrationpages/Clogin';
import {HashRouter, Route,BrowserRouter, Routes} from 'react-router-dom'

import Register from './Registrationpages/Register';


import Organizerloginotp from './Registrationpages/Organizerloginotp';
import Restrictor from './Registrationpages/Restrictor';
import Attendeeloginotp from './Registrationpages/Attendeeloginotp';
import Attendeeotprestrictor from './Registrationpages/Attendeeotprestrictor'
import Forgotpasswordrestrictor from './Registrationpages/Forgotpasswordrestrictor';
import Forgotpasswordver from './Registrationpages/Forgotpasswordver';
import Dashboard from './orgnaizerpages/Dashboard';
import Dashboardrestrictor from './orgnaizerpages/Dashboardrestrictor';
import AttendeesTab from './attendeespages/Attendeestab';
import Invitation from './eventInvitation/Invitation';
import Tabrestrictor from './attendeespages/Tabrestrictor';
import Buyticket from './eventInvitation/Buyticket';
import Searchs from './attendeespages/Search';
import Schedule from './test';
import Communitychat from './communitychat/Communitychat';
import Profile from './profilePage/Profile';
import Privatechat from './privatchat/Privatechat';
import Homerestrictor from './Registrationpages/Homerestrictor';

function App() {

  return (
<BrowserRouter>
<Routes>
      <Route path='/' element={
        <Homerestrictor>
          <Home />
        </Homerestrictor>
      }/>
      <Route path='/organizerRegister' element={<Cregister />}/>
  <Route path='/guestRegister' element={<Guestregister />}/>
  <Route path='/organizerLogin' element={<Clogin />}/>
  <Route path='/guestLogin' element={<Glogin />}/>
  <Route path='/organizerLoginOtpVerification' element={<Restrictor>
<Organizerloginotp />
  </Restrictor>}/>
  <Route path='/attendeeLoginOtpVerification' element={<Attendeeotprestrictor><Attendeeloginotp /></Attendeeotprestrictor>}/>
    <Route path='/forgot/forgotPassword' element={<Forgotpasswordrestrictor>
      <Forgotpasswordver />
    </Forgotpasswordrestrictor>}/>
<Route path='/organizer/dashboard' element={
<Dashboardrestrictor>
<Dashboard />
</Dashboardrestrictor>
}/>
<Route path='/attendee/tabs' element={
  <Tabrestrictor>
    <AttendeesTab />
   
  </Tabrestrictor>

}/>
  <Route path="/buyticket" element={
    <Tabrestrictor>
      <Buyticket />
    </Tabrestrictor>
  }/>

  <Route path='/test' element={<Schedule />}/>

<Route path='/event-invitation' element={<Invitation />}/>

<Route path='/community' element={
  <Tabrestrictor>
    <Communitychat />
  </Tabrestrictor>
}/>

<Route path='/profile' element={
  <Tabrestrictor>
 <Profile />
  </Tabrestrictor>
}/>

<Route path='/lateformchat' element={
  <Tabrestrictor>
<Privatechat />
  </Tabrestrictor>
}/>

    </Routes>
</BrowserRouter>
  );
}

export default App;
