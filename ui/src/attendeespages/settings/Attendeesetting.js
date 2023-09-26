import axios from 'axios'
import { useEffect, useState } from 'react'
import { Bell, BellFill, Envelope, GearFill, List} from 'react-bootstrap-icons'

import Basicupdate from './components/BasicUpdate'
import Updatepassword from './components/Updatepassword'
function Attendeesetting(){
    let [data,setData] = useState(null);
    let [val,setVal] = useState(1)
useEffect(()=>{
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
     setData(res.data)
    }).catch((err)=>{
        console.log(err.response.data)
    })
},[])

let returnComponent = ()=>{
if(val === 1){
return <Basicupdate email={data.email} data={data}/>
}
if(val === 2){
    return <Updatepassword email={data.email}/>
}

if(val === 3){
    return <Notification email={data.email}/>
}
}

    return(
        <>
       <b className='fs-4'><GearFill className='mb-1 me-1'/>Setting</b>
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-12 ">
                    

{data === null ? (
    <div className='text-center  mt-5'>
    <div class="spinner-border text-primary" style={{width: "8rem",height: "8rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    </div>
):(
    <>



<hr />

<div class="dropdown">
  <span class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <List size={25}/>
  </span>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
<span className="dropdown-item" onClick={()=>{setVal(1)}}>basic update</span>
<span  className="dropdown-item" onClick={()=>{setVal(2)}}>change password</span >
{/* <span  className="dropdown-item" onClick={()=>{setVal(3)}}>notification</span> */}
<span  className="dropdown-item disabled" onClick={()=>{setVal(4)}}>privacy policy</span>
</div>


</div>

<div>
    {returnComponent()}
</div>

</>
)}
                </div>
                {/* <div className="col-lg-4 d-none d-lg-block">
<div className="text-center p-5 position-fixed">
<img src={profile} alt="lateform-attendee-profile" className='img-fluid floating'/>
</div>

                </div> */}
            </div>
        </div>
        </>
    )
}

export default Attendeesetting







export function Notification(){
    return(
       <div className='mt-5 mb-3'>
<div className='text-center mb-2'>
<b className='fs-4 fw-bold'>notification <BellFill /></b>
</div>
    <div className='d-flex justify-content-between p-3 mt-2 border'>
<div>
    <p><Bell  className='me-1 mb-1'/>Enable the push notification</p>
</div>
<div>
    <button className='btn btn-primary'>enable</button>
</div>
</div>
<div className='d-flex justify-content-between mt-2 p-3 border'>
<div>
    <p><Envelope className='me-1 mb-1'/>Enable the email notification</p>
</div>
<div>
    <button className='btn btn-primary'>enable</button>
</div>
</div>
       </div>
    )
}

