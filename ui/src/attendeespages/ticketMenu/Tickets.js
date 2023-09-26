import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import axios from 'axios'
import Chatmodel from './components/Chatmodel'
import {Calendar, Cart, ChatDotsFill, CurrencyDollar, Info,TicketFill}from'react-bootstrap-icons'

import TicketDetails from "./components/Ticketdetails"

function TIckets(){
  let [ticketDetail,setTicketDetail] = useState("");
  let [modal,setModal] = useState();
  let [isFetch,setFetch] = useState(false);
  let [token,setToken] = useState("")
  useEffect(()=>{
  
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id:localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
      setToken(res.data.FCMT)
      axios.post(process.env.REACT_APP_BACKEND_URL+'/tickets/getTicketDetails',{email:res.data.email}).then((res)=>{
        console.log(res.data)
        setTicketDetail(res.data)
        setFetch(true)
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  let eventStatus = (heldOn)=>{
if(new Date(heldOn)>new Date()){

return (
  <div className="alert alert-warning rounded text-center">event will soon!</div>
)
}if(new Date(heldOn)<new Date()){
 return( <div className="alert alert-info rounded text-center">event was ended!</div>)

}
if(new Date(heldOn) === new Date()){
  return( <div className="alert alert-success rounded text-center">event is active!</div>)
 
 }
 
  }

  
    return(
        <>
{ticketDetail.length === 0?(
      isFetch === false?(
        <div className="container-md mt-5">
        <div className="row">
        <div className="col-lg-4 col-md-6 ">
        <div classNaame="card">
          <div className="card-body card-border mt-3 p-1">
            <h5 className="card-title"><Skeleton/></h5>
            <p className="card-text p-3"><Skeleton count={3}/></p>
           
          </div>
        </div>
        </div>
        
        </div>
              </div>
      ):(
        <div className="text-center mt-3">
          <TicketFill className="text-secondary" size={150}/>
          <p className="text-secondary fs-2">No ticket purchase has been made yet!.</p>
        </div>
      )
):(
        <div className="container-md mt-5">
        <div className="row">
{ticketDetail.map((vals,index)=>{
  return(
    <div className="col-lg-4 col-md-6">
    <div>
      <div className="card-body card-border mt-3 p-2">
        <h5 className="card-title d-inline">{vals.eventName}</h5>
        <span className="float-right badge badge-success"><CurrencyDollar className="pb-1 pe-1" size={15}/>free</span>
        <div className="mt-2">
          <span className="badge badge badge-primary">{vals.typeOfEvent}</span>
          <span className="ms-1 badge badge badge-danger">{vals.typeOfCategory}</span>
          </div>

<div className="mt-3 mb-2 p-2  pb-3 border-bottom">
{
eventStatus(vals.heldOn)
}
<p className="fs-4 text-center border rounded p-1 fw-bold"><Calendar className="me-3 text-secondary "/>{vals.heldOn}</p>
<div className="d-flex justify-content-around">
<button className="btn btn-dark rounded col-10" data-toggle="modal" data-target="#ticket-modal" onClick={()=>{setModal(vals)}}>Details <Info /></button>
<button className="btn btn-secondary rounded-circle ms-1" data-toggle="modal" data-target="#event-chat" onClick={()=>{setModal(vals)}}><ChatDotsFill /></button>
</div>
</div>         
</div>
    </div>
    </div>
  
  )
})}





{modal === undefined?null:(
<>
{/* chat modal */}
<Chatmodel eventId={modal.id} email={modal.email} token={token} name={modal.userName}/>
  {/* detail modal */}
<TicketDetails modal = {modal}/>
</>
)}

</div>
              </div>
)}
        </>
    )
}

export default TIckets


