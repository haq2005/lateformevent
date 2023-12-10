import {toast, ToastContainer}from'react-toastify'
import { useState } from 'react';
import axios from 'axios';
import {Key, Lock,  ShieldLock } from 'react-bootstrap-icons'
function Updatepassword(props){
    let [oldPassword,setOldPassword] = useState("");
    let [newPassword,setNewPassword] = useState("")
    let [disable,setDisable] = useState(false)
    let updatePassword = (event)=>{
        event.preventDefault()
        console.log('hello')
        setDisable(true)
        console.log(newPassword.length)
        if(newPassword.length >= 8 && newPassword.length <= 15){

            if(oldPassword.length !== 0){
                axios.post(process.env.REACT_APP_BACKEND_URL+"/update/updateAttendeeProfile",{id:4,email:props.email,oldPassword,newPassword}).then((res)=>{
                    toast.success(res.data)
                  
                }).catch((err)=>{
                    toast.error(err.response.data)
                  
                })
            }else{
                toast.error("give a proper old password input")
            }
        }else{
            toast.error('new password length should be contain minimum 8 letter and maximum 15 letters')
        }
      setTimeout(()=>{
        setDisable(false)
      },2000)
    }
    return(
<div className='mt-5'>
{disable===true? <span className="loaders"></span>:null}
<div className='text-center'>
<b className='fs-5 fw-bold'>change Password <Lock /></b>

</div>
<form className='p-5'>
    <label className='form-label'>old password<ShieldLock /></label>
    <input type="text" className="form-control" onChange={(e)=>{setOldPassword(e.target.value)}}/>
    <label className="form-label">new password <Key /></label>
    <input type="text" className="form-control" onChange={(e)=>{setNewPassword(e.target.value)}}/>
    <button className='btn btn-primary mt-3 mb-3 float-right' onClick={(event)=>{updatePassword(event)}} disabled={disable}>change password</button>

</form>
<ToastContainer />
</div>

    )
}
export default Updatepassword