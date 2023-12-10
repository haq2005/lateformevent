import "./App.css";
import "react-bootstrap-icons";
import Guestregister from "./Registrationpages/Gregister";
import Cregister from "./Registrationpages/Cregister";

import Home from "./Registrationpages/login/loginPg";
import Faq from "./Registrationpages/Faq";
import Glogin from "./Registrationpages/login/Glogin";
import Clogin from "./Registrationpages/login/Clogin";
import { HashRouter, Route, BrowserRouter, Routes } from "react-router-dom";

import Register from "./Registrationpages/Register";

import Organizerloginotp from "./Registrationpages/Organizerloginotp";
import Restrictor from "./Registrationpages/Restrictor";
import Attendeeloginotp from "./Registrationpages/Attendeeloginotp";
import Attendeeotprestrictor from "./Registrationpages/Attendeeotprestrictor";
import Forgotpasswordrestrictor from "./Registrationpages/Forgotpasswordrestrictor";
import Forgotpasswordver from "./Registrationpages/Forgotpasswordver";
import Dashboard from "./orgnaizerpages/Dashboard";
import Dashboardrestrictor from "./orgnaizerpages/Dashboardrestrictor";
import AttendeesTab from "./attendeespages/Attendeestab";
import Invitation from "./eventInvitation/Invitation";
import Tabrestrictor from "./attendeespages/Tabrestrictor";
import Buyticket from "./eventInvitation/Buyticket";
import Searchs from "./attendeespages/Search";
import Schedule from "./test";
import Communitychat from "./communitychat/Communitychat";
//import Profile, { AttendeeProfileContext } from "./profilePage/Profile";
import Privatechat from "./privatchat/Privatechat";
import Homerestrictor from "./Registrationpages/Homerestrictor";
import ProfileUploader from "./attendeespages/profile/components/ProfileUploader";
import Profile from "./attendeespages/profileByLoki/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homerestrictor>
              <Home />
            </Homerestrictor>
          }
        />
        <Route path="/organizerRegister" element={<Cregister />} />
        <Route path="/guestRegister" element={<Guestregister />} />
        {/* <Route path="/organizerLogin" element={<Clogin />} />
        <Route path="/guestLogin" element={<Glogin />} /> */}
        <Route
          path="/organizerLoginOtpVerification"
          element={
            <Restrictor>
              <Organizerloginotp />
            </Restrictor>
          }
        />
        <Route
          path="/attendeeLoginOtpVerification"
          element={
            <Attendeeotprestrictor>
              <Attendeeloginotp />
            </Attendeeotprestrictor>
          }
        />
        <Route
          path="/forgot/forgotPassword"
          element={
            <Forgotpasswordrestrictor>
              <Forgotpasswordver />
            </Forgotpasswordrestrictor>
          }
        />
        <Route
          path="/organizer/dashboard"
          element={
            <Dashboardrestrictor>
              <Dashboard />
            </Dashboardrestrictor>
          }
        />
        <Route
          path="/attendee/tabs"
          element={
            <Tabrestrictor>
              <AttendeesTab />
            </Tabrestrictor>
          }
        />
        <Route
          path="/attendee/tabs/yourProfile"
          element={
            <Tabrestrictor>
              <Profile />
            </Tabrestrictor>
          }
        />
        <Route
          path="/buyticket"
          element={
            <Tabrestrictor>
              <Buyticket />
            </Tabrestrictor>
          }
        />

        <Route path="/test" element={<Schedule />} />

        <Route path="/event-invitation" element={<Invitation />} />

        <Route
          path="/community"
          element={
            <Tabrestrictor>
              <Communitychat />
            </Tabrestrictor>
          }
        />

        <Route
          path="/profile"
          element={
            <Tabrestrictor>
              <Profile />
            </Tabrestrictor>
          }
        />

        <Route
          path="/lateformchat"
          element={
            <Tabrestrictor>
              <Privatechat />
            </Tabrestrictor>
          }
        />

        <Route
          path="/blogs"
          element={
            <Tabrestrictor>
              <h1>HEllo bro</h1>
            </Tabrestrictor>
          }
        />
        <Route
          path="/forum"
          element={
            <Tabrestrictor>
              <h1>HEllo /forum</h1>
            </Tabrestrictor>
          }
        />
        <Route
          path="/courses"
          element={
            <Tabrestrictor>
              <h1>HEllo //courses</h1>
            </Tabrestrictor>
          }
        />
        <Route
          path="/events"
          element={
            <Tabrestrictor>
              <h1>HEllo events</h1>
            </Tabrestrictor>
          }
        />
        <Route
          path="/chat"
          element={
            <Tabrestrictor>
              <h1>HEllo from chat</h1>
            </Tabrestrictor>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
