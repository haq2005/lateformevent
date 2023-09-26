import axios from "axios"
import { useEffect, useState,createContext } from "react"
import 'react-bootstrap-icons'
import { CalendarEventFill, CalendarFill,Calendar2Check , ChatDotsFill, InfoCircleFill, ShareFill } from "react-bootstrap-icons";
import Chatmodel from "../../attendeespages/ticketMenu/components/Chatmodel";
import noevent from '../../image/noevent.svg'
import Detailmodal from "./components/Detailmodal";
import Sharemodal from './components/Sharemodal'
export const MyEventContext = new createContext()

function Myevents(props){
    let [events,setEvents] = useState([]);
    let [modal,setModal] = useState()
    let [renderAttendees,setRenderAttendees] = useState(false)
    useEffect(()=>{
axios.post(process.env.REACT_APP_BACKEND_URL+'/event/organizerEvent',{email:props.account.email}).then((res)=>{
  console.log(res.data)
    setEvents(res.data)
}).catch((err)=>{
    console.log(err)
})
    },[])
    console.log("this is from modal: ",modal)
    console.log(renderAttendees)
    return(
        <>
       <MyEventContext.Provider value={{events:[events,setEvents],modals:[modal,setModal],renderAttendees:[renderAttendees,setRenderAttendees]}}>
       <div className="container">
<div className="hello mb-3">
<h5 className="border-bottom p-3 ">Hello 👋,{props.account.fullName}</h5>

</div>
<br />
{events.length !== 0?(
  <div className="d-flex   flex-wrap">

  {events.map((val,index)=>{
    let valId = val.id
    let slice_1 = valId.slice(0,5)
    let slice_2 = valId.slice(18,24);
    let id = slice_1 +"..."+slice_2
        return (
  <div className=" p-3 rounded shadow mb-5 col-lg-5 col-12 me-3 alert-primary">
    <div className="card-body ">
      <b className=" ps-3 pe-3">{val.eventName} <ShareFill onClick={()=>{setModal(val)}} data-toggle="modal" data-target="#shareEvent" className="ms-1 mb-1 cursor-pointer"/></b>
      <p className=" ps-3 pe-3 mt-2"><CalendarFill className="me-1 mb-1"/>{val.eventHeld}</p>
  
  <span className="text-primary cursor-pointer ps-3 pe-3" data-toggle="modal" data-target="#exampleModalLong" onClick={()=>{setModal(val)}}>
  More info <InfoCircleFill className="ms-1 mb-1"/>
  </span>
  
  
    </div>
    <button className="btn btn-outline-primary mt-2 btn-full rounded" data-toggle="modal" data-target="#event-chat" onClick={()=>{setModal(val)}}>Chat <ChatDotsFill className="ms-1 mb-1"/></button>
  </div>
      )
     })}
  
  {modal === undefined?null:(
    <>
    {/* chat modal */}
    <Chatmodel eventId={modal.id} email={props.account.email} name={props.account.fullName} token={props.account.FCMT}/>
    {/* detail modal */}
   <Detailmodal />
    </>
  
  )}
  
  {
    modal === undefined?null:(
   <Sharemodal />
    )
  }
  </div>
):<div className="container-md">
  <div className="text-center">
  <p className="text-secondary fs-5"><CalendarEventFill className="me-1 mb-1" />You still not created any event!</p>

 <img src={noevent} style={{width:"250px",height:"250px"}}/>
  </div>
  </div>}
       </div>
       </MyEventContext.Provider>
        </>
    )
}
export default Myevents