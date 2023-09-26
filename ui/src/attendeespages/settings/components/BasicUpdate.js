import {toast, ToastContainer}from'react-toastify'
import axios from 'axios'
import { useState } from 'react'
function Basicupdate(props){
    let [newemail,setEmail] = useState()
    let [newName,setNewName] = useState("")
    let [disable,setDisable] = useState(false)
    let [newRecoveryMail,setNewRecoveryMail] = useState("")
    
        let updateBasicInfo = (val)=>{
            setDisable(true)
            let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        //updating mail
    if(val === 1){
    if(re.test(newemail)){
       
        axios.post(process.env.REACT_APP_BACKEND_URL+"/update/updateAttendeeProfile",{id:val,email:props.email,newEmail:newemail}).then((res)=>{
            toast.success(res.data)
          
        }).catch((err)=>{
            toast.error(err.response.data)
          
        })
    
    }else{
        toast.error('mail format is invalid')
    }
    
    }
    //updating fullName
    if(val === 2){
        if(newName.length>3){
            axios.post(process.env.REACT_APP_BACKEND_URL+"/update/updateAttendeeProfile",{id:val,email:props.email,newFullName:newName}).then((res)=>{
                toast.success(res.data)
              
            }).catch((err)=>{
                toast.error(err.response.data)
              
            })
        }else{
            toast.error('length of the name should be more than 3 letters')
        }
    }
    
    //updating recovery email
    
    if(val===3){
        let r = re.test(newRecoveryMail)
        console.log(r)
        console.log(newRecoveryMail)
        if(r === true){
            axios.post(process.env.REACT_APP_BACKEND_URL+"/update/updateAttendeeProfile",{id:val,email:props.email,newRecoveryEmail:newRecoveryMail}).then((res)=>{
                toast.success(res.data)
              
            }).catch((err)=>{
                toast.error(err.response.data)
              
            })
        }else{
            toast.error('new recovery mail input is invalid')
        }
    }
    
    //disabling..
    setTimeout(()=>{
        setDisable(false)
      },2000)
        }
    
        let logout = ()=>{
            let isConfirm = window.confirm('are you sure to logout from your account?');
            if(isConfirm === true){
    window.localStorage.clear();
    window.location.reload()
            }
        }
        return (
    <>
    <div>
             
             {disable===true? <span className="loaders"></span>:null}
              
                        {/* attendee full name edit */}
                        <b className='fs-4'>Profile</b>
    <div className="row p-3 pb-5  m-1">
             <label className='text-secondary'>Choose how you are displayed as a attendee.</label>
    <div className='col-8 col-lg-5'>
       
    <input type="text" className="form-control p-2"  placeholder={props.data.fullName} onChange={(e)=>{setNewName(e.target.value)}}/>
    </div>
             <button className="btn btn-dark  col-3" disabled={disable} onClick={()=>{updateBasicInfo(2)}}>edit</button>
     </div>
    <b className='fs-4'>Email </b>
             {/* attendee phone number edit */}
             {/* <div className="row p-3 pb-5 m-1">
                <label  className='text-secondary'> Manage the phone, you use to receive whatsapp reminder and sms notification.</label>
              <div className='col-8 col-lg-5'>
              <input type="text" className="form-control" placeholder='edit your phone number'/>
              </div>
             <button className="btn btn-dark  col-3" disabled={disable}>edit</button>
             </div> */}
             {/* attendee emil */}
          
             <div className="row p-3 pb-5 m-1">
                <label className='text-secondary'>Manage the email, you use to sign into Lateform and receive notifications.</label>
    <div className='col-8 col-lg-5'>
    <input type="email" className="form-control" placeholder={props.data.email} onChange={(event)=>{setEmail(event.target.value)}} required/>
    
    </div>
             <button className="btn btn-dark col-3" onClick={()=>{updateBasicInfo(1)}} disabled={disable}>edit</button>
             </div>
    
             {/* recovery email */}
             <b className='fs-4'>Recovery email</b>
             <div className="row p-3 pb-5 m-1">
                <label className='text-secondary'>Manage recover email to recover your account when you lost</label>
    <div className='col-8 col-lg-5'>
    <input type="email" className="form-control"  placeholder={props.data.recoveryEmail} onChange={(e)=>{setNewRecoveryMail(e.target.value)}}/>
    
    </div>
             <button className="btn btn-dark col-3" disabled={disable} onClick={()=>{updateBasicInfo(3)}}>edit</button>
             </div>
            
            <div className='ms-3 mt-5 mb-5'>
            <b className='fs-4 d-block mb-2'>Logout</b>
            <label className='text-secondary'>If you no longer wish to login lateform, you can logout your account.</label>
            <br />
             <button className='btn btn-danger mt-2' disabled={disable} onClick={logout}>logout accout</button>
    
            </div>
             </div>
             
                
             <ToastContainer />        
    </>
        )
    }
    export default Basicupdate