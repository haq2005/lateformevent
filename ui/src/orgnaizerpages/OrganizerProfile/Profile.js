
import { useState} from 'react'

import {ToastContainer,toast} from 'react-toastify'

import {  List } from 'react-bootstrap-icons'
import {Notification} from '../../attendeespages/settings/Attendeesetting'
import BasicInfo from './components/BasicInfo'
import Updatepassword from './components/Updatepassword'

function Profile(props){
    let [val,setVal] = useState(1)
    let returnComponent = ()=>{
        if(val === 1){
        return <BasicInfo account={props.account}/>
        }
if(val === 2){
    return <Updatepassword account={props.account}/>
}
if(val === 3){
    return <Notification />
}
        }
    console.log("this is from profile:",props.account)
    let logoutAccount = ()=>{
        let isTrue = window.confirm("are you sure to logout");
       if(isTrue){
       window.localStorage.clear();
    window.location.reload()   
    }
       
    }
    return(
        <>
        <div className='container-md'>
<div className="dropdown">
  <span className=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <List size={25}/>
  </span>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
<span className="dropdown-item cursor-pointer" onClick={()=>{setVal(1)}}>basic update</span>
<span  className="dropdown-item cursor-pointer" onClick={()=>{setVal(2)}}>change password</span >
{/* <span  className="dropdown-item" onClick={()=>{setVal(3)}}>notification</span> */}
<span  className="dropdown-item disabled cursor-pointer" onClick={()=>{setVal(4)}}>privacy policy</span>
<span  className="dropdown-item text-danger cursor-pointer" onClick={logoutAccount}>logout</span>
</div>
</div>

{/* component rendering... */}

<div className='mt-5'>
{returnComponent()}
</div>
        </div>
        <ToastContainer />
        </>
    )
}






//change password



export default Profile