
import { useEffect, useState } from 'react'
import {  CashCoin, ChatDots, ChatDotsFill, GeoFill, PersonBadge, PersonCheck, PersonCircle, PieChart, PlusCircle,  } from 'react-bootstrap-icons'
import Nav from '../Nav'
import {messaging} from '../firebase.js'
import  {getToken} from 'firebase/messaging'
import EventAnalytics from './analytic/EventAnalytics'
import Profile from './OrganizerProfile/Profile'
import Setup from './setup/Setup'
import AttendeesPie from './Attendees/AttendeesPie'
import axios from 'axios'
import Myevents from './myevents/Myevent'
import Payment from './Payment'
import CommitteeRecruit from './verifyattendee/CommitteeRecruit'
import Communitychat from './Communitychat'

function Dashboard(){
    let [acc,setAccount] = useState("");
    let [value,setValue] = useState(1);
    let [notificationStatus,setNotificationStatus] = useState(true)
let [token,setToken] = useState()
    let notification = async(email)=>{
      let permission =  await Notification.requestPermission()
if(permission === 'granted'){
   let tk = await getToken(messaging,{vapidKey:"BN6mxIT-jJW-ONUWI007QGzFnCTd3TX5PhCmf-ikGwgVwZVIlNYMk9KTodka_utfu8KTL0laaSuuvKYMeufhuDA"})
   console.log(tk)
   setToken(tk)
   axios.post(process.env.REACT_APP_BACKEND_URL+"/update/organizerNotificationToken",{email:email,token:tk}).then((res)=>{
       console.log(res.data);
   }).catch((err)=>{
       console.log(err)
   })
}else if(permission === 'denied'){
setNotificationStatus(false)
}

   }

    useEffect(()=>{
        
        let data = {id:window.localStorage.getItem('id')}
        axios.post(process.env.REACT_APP_BACKEND_URL+"/login/organizerEnv",{data:data},{headers:{Oauth_2:window.localStorage.getItem('Oauth_2')}}).then((res)=>{
setAccount(res.data)
console.log(res.data)
notification(res.data.email)
        }).catch((err)=>{
            console.log(err.response.data)
        })
    },[])
    let container = ()=>{
        if(value === 1){
            return <Profile account={acc}/>
        }
        if(value ===2){
            return <Setup account={acc}/>
        }
       if(value === 3){
        console.log(acc)
            return <AttendeesPie  account={acc}/>
        }
         if(value === 4){
            return <EventAnalytics  account={acc}/>
        }
   
      if(value === 6){
        return <Myevents account={acc}/>
      }
      if(value === 7){
        return <Payment account={acc}/>
      }
      if(value === 5){
        return <CommitteeRecruit account={acc}/>
      }
      if(value === 8){
        return <Communitychat account={acc} token={token}/>
      }
    }
    console.log("this is from acc",acc)
    return(
        <>
       {acc !== ""?<div className='container-fluid '>
<div className='row '>
<div className='col-lg-3 border-right d-none d-lg-block  position-relative' >


<ul className='organizer-nav shadow' style={{listStyle:"none", padding:"0px"}} >
  <li>
    <Nav />
  </li>
<li className="nav-item p-3 border-bottom"  onClick={()=>{setValue(1)}}>
  <span className="nav-link " ><PersonCircle className='me-1 mb-1'/>My Account</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(6)}}>
  <span className="nav-link" ><GeoFill />My Events</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(4)}}>
  <span className="nav-link" ><PieChart className='me-1 mb-1' />Event Analytics</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(3)}}>
  <span className="nav-link" ><PersonBadge className='me-1 mb-1'/>Event Attendees</span>
</li>

<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(5)}}>
  <span className="nav-link" ><PersonCheck className='me-1 mb-1'  />Verify Attendee</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(7)}}>
  <span className="nav-link" ><CashCoin className='me-1 mb-1' /> Payments & Bills</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(8)}}>
  <span className="nav-link" ><ChatDotsFill className='me-1 mb-1'/> Chats</span>
</li>
<li className="nav-item p-3 " onClick={()=>{setValue(2)}}>
<button className='btn btn-primary' >Create New Event <PlusCircle className='me-1 mb-1'/></button>
</li>
</ul>

</div>
{/* sm nav */}
<nav class="navbar navbar-expand-lg sticky-top d-lg-none navbar-light  bg-light">
  <Nav />
  <button class="navbar-toggler me-2 " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className='navbar-collapse' style={{listStyle:"none", padding:"0px"}} >
  
<li className="nav-item p-3 border-bottom">
  <span className="nav-link "  onClick={()=>{setValue(1)}}><PersonCircle className='me-1 mb-1'/>Profile & Setting</span>
</li>
<li className="nav-item p-3 border-bottom">
  <span className="nav-link" onClick={()=>{setValue(6)}}><GeoFill />My Events</span>
</li>
<li className="nav-item p-3 border-bottom">
  <span className="nav-link"  onClick={()=>{setValue(4)}}><PieChart className='me-1 mb-1' />Event Analytics</span>
</li>
<li className="nav-item p-3 border-bottom">
  <span className="nav-link"  onClick={()=>{setValue(3)}}><PersonBadge className='me-1 mb-1'/>Attendees</span>
</li>

<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(5)}}>
  <span className="nav-link" ><PersonCheck className='me-1 mb-1'  />verify Attendee</span>
</li>
<li className="nav-item p-3 border-bottom">
  <span className="nav-link" onClick={()=>{setValue(7)}}><CashCoin className='me-1 mb-1' /> payments & bills</span>
</li>
<li className="nav-item p-3 border-bottom" onClick={()=>{setValue(8)}}>
  <span className="nav-link" ><ChatDotsFill className='me-1 mb-1'/> Chats</span>
</li>
<li className="nav-item p-3 ">
<button className='btn btn-primary' onClick={()=>{setValue(2)}}>Create New Event <PlusCircle className='me-1 mb-1'/></button>
</li>
</ul>
 
  </div>
</nav>
<div className='col-lg-7 p-3' style={{height:"100%"}}>
{container()}
</div>
</div>
</div>:<p>loading...</p>}

        </>
    )
}
export default Dashboard

{/* <div className='container-md'>
<ArrowLeft size={40} className="fw-bolder back mb-2" onClick={()=>{setValue(0)}}/>
{
value === 0?(            <div >
<div className='d-flex flex-wrap d-flex justify-content-around mt-5'>
<div className='rounded  p-5 dash-card-1 mt-5' onClick={()=>{setValue(1)}}>
<PersonCircle size={90} className="fw-bolder"/>
</div>

<div className='rounded  p-5 dash-card-2 mt-5' onClick={()=>{setValue(2)}}>
<GearFill size={90} className="fw-bolder"/>
</div>

<div className='rounded  p-5 dash-card-3 mt-5' onClick={()=>{setValue(3)}}>
<PieChart size={90} className="fw-bolder "/>
</div>
</div>
<div className='d-flex flex-wrap d-flex justify-content-around mt-5 mb-5' onClick={()=>{setValue(4)}}>
<div className='rounded  p-5 dash-card-4 mt-5 '>
<ChatDots size={90} className="fw-bolder"/>
</div>

<div className='rounded  p-5 dash-card-5 mt-5' onClick={()=>{setValue(5)}}>
<CashCoin size={90} className="fw-bolder"/>
</div>

<div className='rounded  p-5 dash-card-6 mt-5' onClick={()=>{setValue(6)}}>
<PersonBadge size={90} className="fw-bolder "/>
</div>
</div>

</div>):container()
}
</div> */}


