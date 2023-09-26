import axios from "axios"
import {useEffect, useState}from'react'
import { HandThumbsDownFill, HandThumbsUpFill } from "react-bootstrap-icons";
import {useNavigate} from 'react-router-dom'
function Searchs(){
    let [result,setResult] = useState([])
let [value,setValue] = useState("");
let navigate = useNavigate()
 
    let searchEvent = (eventName)=>{
        setValue(eventName)
      if(eventName.length > 3){
        axios.post(process.env.REACT_APP_BACKEND_URL+'/eventSetup/searchEvent',{eventName:eventName}).then((res)=>{
            console.log(res.data)
            setResult(res.data)
         }).catch((err)=>{
            console.log(err.response.data)
         })
      }else{
        setResult([])
      }
    }
    console.log(result)
    let redirect = (id)=>{
        console.log('called')
        navigate("/event-invitation?id="+id);
    }
    return(
        <>
<div>

     <div>
     <input name="event" id="event" autoComplete="off" className="form-control rounded p-2 mt-1" placeholder="Search Lateform" onChange={(e)=>{searchEvent(e.target.value)}}/>

     <div className="position-relative">
     <div id="eventName" className="search-result shadow border rounded" style={{zIndex:"1"}}>
    {result.map((val)=>{
        console.log("this filtered value",val)
        return (
            <div className="p-3 search-event border-bottom d-flex justify-content-between" onClick={()=>{redirect(val.id)}}>
<span className=" " >{val.eventName}</span>
{/* <span className="text-secondary"><HandThumbsUpFill className="mb-1"/>{val.likes.length}</span>
<span className="text-secondary"><HandThumbsDownFill className="mb-1"/>{val.dislikes.length}</span>
<span className="text-secondary">attendees: {val.attendees.length}</span> */}
            </div>
        )
    })}
     </div>
     </div>
     </div>
</div>
        </>
    )
}
export default Searchs