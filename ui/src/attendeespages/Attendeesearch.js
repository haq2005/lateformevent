import axios from "axios"
import {useEffect, useState}from'react'
import { useNavigate } from "react-router";
import {Calendar, Search} from'react-bootstrap-icons'
import noevent from '../image/noevent.svg'
import joinGroupService from "../services/attendeesearch/joinGroupService";

function Attendeesearch(){

let [events,setEvents] = useState([])
let [fetch,setFetch] = useState(false)
let [communities,setCommunities] = useState([]);
let [comFetch,setComFetch] = useState(false)
let [email,setEmail] = useState("")
let [join,setJoin] = useState({
  communityId:"",
  communityName:""
})
let navigate = useNavigate()
useEffect(()=>{
  axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    setEmail(res.data.email)
    axios.post(process.env.REACT_APP_BACKEND_URL+'/community/getCommunities',{email:res.data.email}).then(res=>{
      console.log(res)
    setCommunities(res.data)
    setComFetch(true)
    }).catch(err=>{
      console.log(err)
    })
}).catch((err)=>{
    console.log(err)
})

axios.get(process.env.REACT_APP_BACKEND_URL+'/event/getEvents').then((res)=>{
    setEvents(res.data)
    setFetch(true)
}).catch((err)=>{
    console.log(err)
    setFetch(true)
})


},[])
//joinGroup is function for join in community
let joinGroup = async()=>{
/*
functionName:joinGroupService
@param1: communityId
@param2: email
return : response from server
useCase: store the user Mail in under community collection in database
*/
joinGroupService(join.communityId,email).then((res)=>{
  navigate("/community?id="+join.communityId)
})

}

    return(
        <div className="container-md mt-5">
<div>


<div className="d-flex justify-content-center mt-3">
<div className="col-12">
<b>Community</b>
{comFetch === true? (<div className="d-flex community-disp" style={{width:"100%"}}>
{
  communities.map((val,index)=>{
    return (
      <div className="p-2 col-lg-2 col-4 p-1 text-center">
<div className="d-flex justify-content-center">
{!val.profilePic?<span className="border d-block rounded-circle text-center profile-font " style={{width:"55px",height:"55px" ,backgroundColor:"blue",color:"white"}}>{val.communityName.slice(0,1).toUpperCase()}</span>
: <img src={process.env.REACT_APP_BACKEND_URL+'/imageHandler/getImage/'+val.profilePic} className="border d-block rounded-circle  " style={{width:"75px",height:"75px" }}/> }
</div>
<span className="mt-1 text-nowrap ">{val.communityName.slice(0,7)}...</span>
<span className="d-block text-primary text-center cursor-pointer" data-toggle="modal" data-target="#joinGroupModal" onClick={()=>{setJoin((prev)=>{return {...prev,communityId:val._id,communityName:val.communityName}})}}>Join</span>

<div className="modal fade" id="joinGroupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
     
      <div className="modal-body">
      Do You Want to Join in this {join.communityName}?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={joinGroup}>Yes</button>
      </div>
    </div>
  </div>
</div>
</div>
    )
  })
}
</div>):<p>loading..</p>}
</div>  
</div>

<br />
   <div className="col-12" style={{zIndex:"0px"}}>
    <b>Events</b>
 {fetch === true?(<>
 {events.length === 0 ?(  <div className="mt-2 text-center">
 <div className="text-center">
 <p className="text-secondary fs-5">Sorry,There is no events are hosted!</p>

 <img src={noevent}  style={{width:"250px",height:"250px"}}/>
  </div>
   </div>):(
    <div className="d-flex flex-wrap ">
{events.map((val)=>{
  let d1 = new Date(val.eventHeld);
  let d2 = new Date().getTime();
  if(d1>d2){
    return(
    
     <>
        <div className="mb-5 event-thumbnail"  type="button" onClick={()=>{navigate('/event-invitation?id='+val._id)}}>
        <div className="shadow" >
        <img src={process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+val.approximateOfEvent.thumb} className="img-fluid" style={{borderRadius:"5px"}}/>
        {/* <div className="card-body p-3">
        <b className="fs-4 d-block text-secondary fw-bolder">{val.eventName}</b>
        <p className="text-primary w-bold "><span><Calendar className="ms-2 me-2 mb-1"/>: </span>{val.eventHeld}</p>
        <p>{val.singleLineDescription}</p>
        </div>   */}
        </div>
        </div>

     </>
         
         
            )
  }
   })}
    </div>
   )}
 </>):(
   <div className="text-center">
     <div className="spinner-border text-primary" style={{width:"8rem",height:"8rem"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
    </div>
 )}
    </div>
</div>






        </div>
    )
}

export default Attendeesearch