import { useEffect, useState } from "react"
import voids from '../../image/void.svg'
import axios from "axios"
import { ArrowLeft, ArrowUpRightSquare } from "react-bootstrap-icons"
import AttendeeTable from "./components/AttendeeTable"
function AttendeesPie(props){
    let [eventArr,seteventArr] = useState([])
    let [renderTable,setRenderTable] = useState(false);
    let [id,setID] = useState("");
 
    useEffect(()=>{
        axios.post(process.env.REACT_APP_BACKEND_URL+'/event/organizerEvent',{email:props.account.email}).then((res)=>{
        let result = res.data;
        let id = result.map((val)=>{
            return val
        })
seteventArr(id)
        }).catch((err)=>{
            console.log(err.response.data)
        })
    },[])

    return(
        <>
{renderTable === false?(
    <div className="container-md">
        <b className="fw-light fs-2">Event Attendees</b>
    {
       eventArr.length === 0 ?<>
      <div className="text-center">
  <p className="text-secondary fs-5">You still not created any event!</p>

 <img src={voids} style={{width:"250px",height:"250px"}}/>
  </div>
  </>: eventArr.map((val,index)=>{
     
            return(
                <div className=" border-bottom p-2 mt-3 d-flex justify-content-between">
    <div><p>{val.eventName}</p></div>
    <div><p className="text-primary" onClick={()=>{setRenderTable(true);setID(val.id)}}>open<ArrowUpRightSquare className="mb-1 ms-1"/></p></div>
                </div>
            )
        })
    }
    </div>
):
<div className="container-md">
<ArrowLeft onClick={()=>{setRenderTable(false)}} size={25}/>
<AttendeeTable id={id}/>
</div>
}
        </>
    )
}
export default AttendeesPie

