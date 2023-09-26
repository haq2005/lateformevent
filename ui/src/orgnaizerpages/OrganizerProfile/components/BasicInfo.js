import { Skeleton } from '@mui/material'
import profile from  '../../../image/profile.jpg'
import { useState,useEffect } from 'react'
import {Building, Envelope, PersonCircle} from 'react-bootstrap-icons'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

function BasicInfo(props){
    console.log("this is from basic info",props.account)
let [fullName,setFullName] = useState("");
let [email,setEmail] = useState("");
let [org,setOrg] = useState("");

let [bio,setBio] = useState("")
let [dis,setDis] = useState(false)
let [profilePic,setProfilePic] = useState("")
useEffect(()=>{
    let data = {id:window.localStorage.getItem('id')}
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/organizerEnv',{data:data},{headers:{Oauth_2:window.localStorage.getItem('Oauth_2')}}).then((res)=>{
      
    setProfilePic(res.data.profilePic)
    }).catch((err)=>{
        console.log(err.response.data)
    })
},[])

//updaing orgaizer details
let updateProfile = (val)=>{

if(val === 1){
   
    if(!fullName){
        alert('fill the full name field properly')
        
    }else{
if(fullName.length >3){
    setDis(true)
    axios.post(process.env.REACT_APP_BACKEND_URL+'/update/updateProfile',{newFullName:fullName,email:props.account.email,id:1}).then((res)=>{
        setDis(false)
        toast.success(res.data)
    }).catch((err)=>{
        setDis(false)
        toast.error(err.response.data)
    })
}else{
    toast.error('give your full name properly!')
}
    
    }
}
if(val === 2){
    
    if(!email){
        alert('fill the email form properly')
        
    }else{
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      
        if(re.test(email)){
            setDis(true)
            axios.post(process.env.REACT_APP_BACKEND_URL+'/update/updateProfile',{newEmail:email,email:props.account.email,id:2}).then((res)=>{
                setDis(false)
                toast.success(res.data)
            }).catch((err)=>{
                setDis(false)
                 toast.error(err.response.data)
                
            })
        }else{
            toast.error('new email is invalid')
        }
 
        
    }
}
if(val === 3){
    
    if(!org){
        alert("fill the organization name properly")
        
    }else{
        setDis(true)
        axios.post(process.env.REACT_APP_BACKEND_URL+'/update/updateProfile',{newOrg:org,email:props.account.email,id:3}).then((res)=>{
            setDis(false) 
            toast.success(res.data)
            
        }).catch((err)=>{
            setDis(false)
             toast.error(err.response.data)
            
        })
        
    }
}
if(val === 4 ){
    console.log('updating phone number....')
}
if(val ===5 ){
    
    if(!bio){
        alert('fill the bio field properly')
        
    }else{
        setDis(true)
        axios.post(process.env.REACT_APP_BACKEND_URL+'/update/updateProfile',{bio:bio,email:props.account.email,id:5}).then((res)=>{
            setDis(false)
            toast.success(res.data)
            
        }).catch((err)=>{
            setDis(false)
             toast.error(err.response.data)
            
        })
        
    }
}

}

//uploading profile
let uploadProfile = async(event)=>{
    
    setDis(true)
let file = event.target.files[0]
const formData = new FormData();
formData.append('image', file);
formData.append('email',props.account.email)

axios.post(process.env.REACT_APP_BACKEND_URL+'/imageHandler/uploadOrganizerProfile',formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res)=>{
    setDis(false)
    console.log('working..')
    toast.success(res.data)
    
    
}).catch((err)=>{  
    setDis(false)
     toast.error(err.response.data)
    
    
})



}
    return(
        <>
      <div className='container-md'>

<div className='row'>
{/* spinner */}
<div className={dis===true?"overlay":"overlay d-none"}>
<div className='loading-spinner'>
<div class="spinner-border text-primary " role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
      </div>
      {/* --spinner end-- */}

<b className='fs-4 mb-2'>your profile & Bio</b>
<p className='text-secondary'>Choose how you are profile displayed as a host in event invitation page!</p>
<div className='col-12 col-lg-8'>
<div className='profile-container border'>
<div>
<img src={!profilePic ? profile: process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+profilePic} className="profile rounded-circle" alt="profile" />
</div>

<div className='profile-uploader mt-2'>
<input type="file" className='form-control' onChange={uploadProfile} accept="image/*" disabled={dis===true?true:false}/>
</div>
</div>
</div>
<div className='col-12 col-lg-8'>
<p className='fw-lighter fs-4'>type your bio...</p>
<textarea className="form-control " placeholder='type your bio...' onChange={(event)=>{setBio(event.target.value)}}></textarea>
<button disabled={dis}  className='btn btn-dark  col-md-4 mt-2' onClick={()=>{updateProfile(5)}}>save changes</button>
<p className='mt-3 text-secondary text-center border-top pt-2'>Your Bio: {props.account.bio}</p>
</div>
</div>
{/* second row */}
<hr />
<div className='row mt-3  p-1'>

<div className='row'>
    {/* sec-1 */}
<div className='row'>
        {/* full name */}
        <b className='fs-4 mb-2'>Name & Organization name</b>
        <p className='text-secondary'>Manage your name and organization name. it helps attendees to indentify the host's profile </p>
<div className='col-md-6 p-2'>
<p><PersonCircle className='mb-1 me-1'/>Name: {props.account.fullName||<Skeleton />}</p>
<div className='d-flex'>
        <input type="text" className='form-control ' placeholder='edit your full name' onChange={(event)=>{setFullName(event.target.value)}}/>
        <button disabled={dis} className='btn btn-dark m-1' onClick={()=>{updateProfile(1)}}>edit</button>
    </div>
</div>
{/* organiztion name */}
<div className='col-md-6 p-2'>
<p><Building className='mb-1 me-1'/>Organization name: {props.account.organizationName||<Skeleton />}</p>
<div className='d-flex'>
        <input type="text" className='form-control ' placeholder='edit your organization name' onChange={(event)=>{setOrg(event.target.value)}}/>
        <button disabled={dis} className='btn btn-dark m-1' onClick={()=>{updateProfile(3)}}>edit</button>
    </div>
</div>
</div>
{/* sec-2 */}
<div className='row'>
        {/* email name */}

<b className='fs-4 mb-2 mt-2'>Email </b>
<p className='text-secondary'>Manage the email,you use to sign into Lateform and receive notifications.</p>
<div className='col-md-6 p-2'>
<p><Envelope className='mb-1 me-1'/>Email: {props.account.email||<Skeleton />}</p>
<div className='d-flex'>
        <input type="email" className='form-control ' placeholder='edit your email' onChange={(event)=>{setEmail(event.target.value)}}/>
        <button disabled={dis} className='btn btn-dark m-1' onClick={()=>{updateProfile(2)}}>edit</button>
    </div>
</div>
{/* phone number*/}
{/* <div className='col-md-6 p-2'>
<p><Telephone className='mb-1 me-1'/>phone number: </p>
<div className='d-flex'>
        <input type="number" className='form-control ' placeholder='set new phone number' />
        <button disabled={dis} className='btn btn-dark m-1' onClick={()=>{updateProfile(4)}}>edit</button>
    </div>
</div> */}
</div>
</div>
</div>
      </div>
      <ToastContainer />
        </>
    )
}
export default BasicInfo