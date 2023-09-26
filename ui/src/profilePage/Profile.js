import { useEffect, useState } from "react"
import axios from 'axios'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import {BriefcaseFill,StarFill,ClockFill,MortarboardFill, EnvelopeFill, ChatDotsFill} from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'
function Profile(){
    let [profile,setProfile] = useState();
    let [profilePic,setProfilePic] = useState();
    let [name,setName] = useState()
    let [changeInnerContent,setChangeInnerContent] = useState(false);
    let [myAccount,setMyAccount] = useState();
    let [id,setId] = useState()
    let navigate = useNavigate()
    useEffect(()=>{
let href = window.location.href;
//let link = href.replace('#/','');
let url = new URL(href);
let id = url.searchParams.get('id')
setId(id)
axios.post(process.env.REACT_APP_BACKEND_URL+"/attendeeProfile/getProfile",{id:id}).then((res)=>{
setProfile(res.data.profile)
setProfilePic(res.data.profilePic)
setName(res.data.name)
}).catch((err)=>{
    console.log(err)
})

axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    setMyAccount(res.data)
}).catch((err)=>{
    console.log(err)
})
    },[])
console.log(profile)
    let changeContent = ()=>{
        console.log('working')
if(changeInnerContent){
    setChangeInnerContent(false)
    

}else{
    setChangeInnerContent(true)


}
    }

    let NavigatePrivateRoom = ()=>{
navigate("/lateformchat?first="+myAccount._id+'&second='+id)
    }
    return(
        <>
     <div className="container-md p-5 mt-5">
{
    !profile?<p>Try Again!</p>:(
        <>
 <div className="profile-container" >
{changeInnerContent === false?(
     <div className="border shadow profile-card cursor-pointer p-5" onClick={changeContent} >
     <div className="profile-card-content text-center">
     <span className="text-secondary text-center">click to see about me!</span>

       <div className="d-flex justify-content-center">
               <img src={profilePic === ""?null:process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+profilePic} className="img-fluid rounded-circle " style={{width:"168px",height:"168px"}}/>
               </div>
               <p className="text-center fw-bold mt-2 fs-3">{name}</p>
               <div className="d-flex justify-content-center mb-5">
                   <a className="me-3 btn btn-outline-dark" href={"mailto:"+profile.email}>Send Mail<EnvelopeFill className="ms-1 mb-1"/></a>
                   <button className="me-3 btn btn-primary" onClick={NavigatePrivateRoom}>Message<ChatDotsFill className="ms-1 mb-1"/></button>
               </div>
               <div className="d-flex justify-content-center">
       <a href={profile.facebook}><FacebookIcon className="me-3" /></a>
       <a href={profile.twitter}><TwitterIcon  className="me-3"/></a>
       <a href={profile.linkedin} ><LinkedinIcon className="me-3"/></a>
       
               </div>
       </div>
       </div>
):(
    <div className="border shadow profile-card cursor-pointer p-5"  onClick={changeContent}>
   <div className="profile-card-content">
   <div className='col-12 p-2 mt-3  border-bottom bg-white mb-2' >
    <div className='-bottom d-flex justify-content-between'>
    <b className='fw-bold fs-5 d-block p-1'>About Interest 💡 
    </b>
    
    </div>
    <div className='p-2'>
      <p> {profile.aboutInterest}</p>
    </div>
    </div>

    <div className="col-12">
        <b>About You</b>
    <div className='p-2'>
       <p className='fs-6'><BriefcaseFill className='text-secondary me-1 mb-1'/>: {profile.aboutYou.work}</p>
       <p className='fs-6'><StarFill className='text-secondary me-1 mb-1'/>: {profile.aboutYou.passion}</p>
       <p className='fs-6'><ClockFill className='text-secondary me-1 mb-1'/>: {profile.aboutYou.timeSpends}</p>
       <p className='fs-6'><MortarboardFill className='text-secondary me-1 mb-1'/>: {profile.aboutYou.qualification}</p>
       <p className='fs-6'>🧠:  {profile.aboutYou.skills}</p>
    </div>
    </div>
    </div>
        </div>
)}
 </div>
        {/*  */}
        </>
    )
}
     </div>
        </>
    )
}
export default Profile