import axios from 'axios'
import {toast} from 'react-toastify'
import { Key, Lock, } from 'react-bootstrap-icons'
import { useState } from 'react';
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
                axios.post(process.env.REACT_APP_BACKEND_URL+"/update/updateProfile",{id:4,email:props.account.email,oldPassword,newPassword}).then((res)=>{
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
    <div className='container-md'>
        {disable===true? <span className="loaders"></span>:null}
  <h5 className='text-center'>Change password</h5>
<div className='d-flex justify-content-center'>
<div className='form col-lg-6'>
    <label className="form-label"><Lock className='me-1 mb-1'/>old password</label>
    <input type="password"  className="form-control" onChange={(e)=>{setOldPassword(e.target.value)}}/>
    <label className="form-label"><Key className='me-1 mb-1'/>new password</label>
    <input type="password" className="form-control" onChange={(e)=>{setNewPassword(e.target.value)}}/>
    <button  className='btn btn-primary mt-3 float-right' onClick={(event)=>{updatePassword(event)}} disabled={disable}>change password</button>
  </div>
</div>

    </div>

    )
}
export default Updatepassword