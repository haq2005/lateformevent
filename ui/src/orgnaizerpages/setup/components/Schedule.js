import { Clock, PlusCircle } from "react-bootstrap-icons";
import Nav from "../../../Nav";
import Progress from "./Progress";

import uniqid from 'uniqid'
import { useState } from "react";


function Schedule({data,setPage,setData}){
let [session,setSession] = useState([])
let [time,setTime] = useState(null);
let[scheduleName,setScheduleName] = useState(null);

let submitSchedule = ()=>{

  setData((prev)=>{
    return [...prev,{schedule:session}]
   })
 
  
   setPage(4)
}
console.log(session)
let addSession = ()=>{
if( scheduleName === null|| time === null){

alert("schedule it properly!")
}else{
let isThere = session.find((val)=>{
  return (val.eventDate === data[0].eventHeld && val.time === time)
})
if(!isThere){
 let isThere = session.find(val=>{
  let time_1 = val.time
  let time_2 = time
  const date1 = new Date();
const date2 = new Date();
  let [hours1,min1] = time_1.split(":");
  date1.setHours(hours1, min1, 0, 0);
  let [hours2,min2] = time_2.split(":");
  date2.setHours(hours2, min2, 0, 0);
return (data[0].eventHeld === val.eventDate&&date1 > date2)
 })

if(!isThere){
  let obj = {
    id:uniqid(),
    eventDate:data[0].eventHeld,
    scheduleName,
    time
  }
  setSession((prev)=>{
  
    return [...prev,obj]
  })
  console.log(obj)
}else{
  alert('set up your schedule properly')
}
}else{
alert('it is already there!')
}
}

}
let deleteShedule = (id)=>{
let newArr = session.filter((val)=>{
 return val.id !== id
})
setSession(newArr)
console.log(newArr)
}
console.log(data)
    return(
        <>
                <Nav />
        <Progress class="progress-bar w-50 bg-primary"/>
<div className="container-md mt-5">
  <b className="fs-4">Shedule your Event Time! <Clock className="mb-1"/></b>
<div className="row mt-3 text-center border-bottom">

<div className="col-6 col-lg-3">
<input value={data[0].eventHeld} className="form-control" disabled={true}/>
</div>

<div className="col-6 col-lg-3">
<input type="time" className="form-control" onChange={(e)=>{console.log(e.target.value);setTime(e.target.value)}}/>
</div>

<div className="col-8 col-lg-3 mt-3 mt-lg-0">
<input type="text" className="form-control" placeholder="schedule name" onChange={(e)=>{setScheduleName(e.target.value)}}/>  
</div>    

<div className="col-4 col-lg-3 mt-3 mt-lg-0">
  <button className="mb-5 btn btn-primary  rounded btn-full p-2 text-center" onClick={addSession} >Add</button>
</div>
 </div>
 {/* next row*/}
 <div className="row p-3">
{session.map((val,index)=>{
return(
  <div className="alert alert-primary col-lg-5 m-2 col-12 alert-dismissible fade show" role="alert">
   <b>{val.eventDate}</b>
   <b className="d-block">{val.scheduleName}</b>
  <span className="d-block">{val.time}</span>
  <button type="button" onClick={()=>{deleteShedule(val.id)}} className="close" >
    <span aria-hidden="true">&times;</span>
  </button>
</div>
)
})}
 </div>
{session.length >= 3? <button className="btn btn-dark float-right mt-3" onClick={submitSchedule}>Next</button>:null}
</div>
        </>
    )
}
export default Schedule