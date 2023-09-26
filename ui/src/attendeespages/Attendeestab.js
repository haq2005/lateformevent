import Attendeesetting from "./settings/Attendeesetting"
import Attendeesearch from "./Attendeesearch"
import Attendeeprofile from './profile/Attendeeprofile'
import Recentevents from "./Recentevents"
import Tickets from "./ticketMenu/Tickets"
import {useEffect, useState} from 'react'
import notification from "../common/notification"
import axios from "axios"
import { Briefcase,Search , ChatDots, ChatDotsFill, PersonCircle, PersonFill, Ticket, TicketFill, TicketPerforatedFill, House, HouseFill, BellFill, GearFill, MenuAppFill } from "react-bootstrap-icons"
import Searchs from './Search'
import Chat from "./Chat"
import AttendeeNotification from "./AttendeeNotification"
import socket from "../socket"
function AttendeesTab(){
    let [val,setVal] = useState(2);
    let [fullName,setFullName] = useState("")
    let returnElement = ()=>{
       if(val === 1){
        console.log(val)
        return <Attendeesetting/>
       }
       if(val === 2){
        return <Attendeesearch />
       }
       if(val === 3){
        return <Recentevents />
       }
     
       if(val === 5){
        return <Tickets />
       }
   
       if(val === 7){
        return <Attendeeprofile />
       }
       if(val === 8){
        return <Chat />
       }
       if(val === 9){
        return  <AttendeeNotification />
       }
    }
 
    useEffect(()=>{
//fetching user detail
axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    setFullName(res.data.fullName)
    notification(res.data.email)
}).catch((err)=>{
    console.log(err)
})
//soocket access;
let isThere = window.localStorage.getItem('privateRoomConnected');
if(isThere){
    socket.disconnect()
}

    },[])
return(
    <>

<div className="container-fluid " style={{height:"100%"}}>
    {/* upper nav for mobile */}
<nav className="navbar d-lg-none navbar-sticky navbar-expand-lg navbar-light bg-white ps-2 pe-2 shadow" >
 <a className="d-none d-lg-block navbar-brand text-primary fs-3 fw-bold" href="/">Lateform</a>

  <div className="d-inline-flex d-inline text-center  justify-content-around" style={{width:"100%"}}>

    <a className="navbar-brand d-lg-none text-primary fs-3 fw-bold" href="/">Lateform</a>

  <div  className="d-none d-lg-block " style={{flexBasis:"60%"}}>
<Searchs/>
</div>

<div className="d-inline-flex justify-content-around" style={{flexBasis:"20%"}}>
<span data-toggle="collapse"   aria-expanded="false" data-target="#attendeeNav" className=" d-lg-none  nav-item  rounded-circle border ms-1  bg-light text-dark p-1" style={{width:"40px",height:"40px"}}><Search size={30} className="p-1"/> </span>
<span className="nav-item  rounded-circle border ms-1  bg-light text-dark p-1" style={{width:"40px",height:"40px"}} onClick={()=>{setVal(8)}}><ChatDotsFill size={30} className="p-1"/> </span>
   <span className="nav-item  rounded-circle border  ms-1 bg-light text-dark p-1"  style={{width:"40px",height:"40px"}} onClick={()=>{setVal(1)}}><GearFill size={30} className="p-1"/> </span>
   
</div>

    </div>
   
<div className="collapse navbar-collapse p-3" id="attendeeNav">
<div className="d-lg-none">
<Searchs/>
</div>
</div>
</nav>
<br />




<div className={"col-12  container-fluid"} >
<div className="row">
<div className="d-none d-lg-block fixed-nav border-right">
<ul className="navbar-nav">
<li><a className="navbar-brand text-primary fs-3 fw-bold " href="/">Lateform</a></li>
<li className="mt-3"><Searchs /></li>
<li className="mt-5 fs-5 fw-light cursor-pointer" onClick={()=>{setVal(2)}}><HouseFill className="mb-1 me-1 "/> Home</li>
<li className="mt-4 fs-5 fw-light cursor-pointer" onClick={()=>{setVal(7)}}><PersonCircle className="mb-1 me-1 "/> Profile</li>
<li className="mt-4 fs-5 fw-light cursor-pointer"  onClick={()=>{setVal(8)}}><ChatDotsFill className="mb-1 me-1 "/> Chats</li>
<li className="mt-4 fs-5 fw-light cursor-pointer" onClick={()=>{setVal(5)}}><TicketFill className="mb-1 me-1 "/> tickets & events</li>

{/* <li className="mt-4 fs-5 fw-light cursor-pointer" onClick={()=>{setVal(9)}}><BellFill  className="mb-1 me-1 "/> Notifications</li> */}
<li className="mt-4 fs-5 fw-light cursor-pointer" onClick={()=>{setVal(1)}}><GearFill className="mb-1 me-1 "/> Settings</li>


</ul>
</div>
<div className="content-disp">
{returnElement()}
</div>
</div>
</div>

{/* lower nav for mobile */}
<div className="d-lg-none shadow bottom-nav">
<div className=" mt-2 d-lg-none bottom-nav-flex ">
<span className="d-block  pt-2  fs-6 " onClick={()=>{setVal(2)}}><HouseFill size={25} className=" mb-2 text-primary"/></span>
<span className="d-block pt-2   fs-6"  onClick={()=>{setVal(7)}}><PersonCircle size={25} className=" mb-2 text-primary"/></span>

 <span className="d-block pt-2   fs-6"  onClick={()=>{setVal(5)}}><TicketPerforatedFill  size={25}  className=" mb-2 text-primary"/></span> 
 </div>
</div>



</div>


    </>
)
}
export default AttendeesTab

{/* <li className="nav-item ms-lg-5 me-5 mt-2 mb-2 text-secondary fw-bold" type="button" onClick={()=>{setVal(1)}}><PersonCircle className="me-2 mb-1"/>profile</li>
    <li className="nav-item me-5 mt-2 mb-2 text-secondary fw-bold" type="button" onClick={()=>{setVal(2)}}><Search className="me-2 mb-1"/>search</li>
    
<li className="nav-item me-5 mt-2 mb-2  text-secondary fw-bold" type="button" onClick={()=>{setVal(3)}}><Briefcase className="me-2 mb-1"/>committe job</li> 
    <li className="nav-item me-5 mt-2 mb-2 text-secondary fw-bold" type="button" onClick={()=>{setVal(5)}}><Ticket className="me-2 mb-1"/>tickets</li>

*/}

{/*<li className="nav-item  rounded-circle border ms-1  bg-light text-dark " style={{width:"45px",height:"45px"}}><ChatDotsFill size={20} className="nav-link"/></li>
   <li className="nav-item rounded-circle border ms-1  bg-light text-dark"  style={{width:"45px",height:"45px"}}><TicketPerforatedFill size={20} className="nav-link"/></li>
   <li className="nav-item  rounded-circle border ms-1  bg-light text-dark"  style={{width:"45px",height:"45px"}}><PersonFill size={20} className="nav-link"/></li>
 </ul> */}