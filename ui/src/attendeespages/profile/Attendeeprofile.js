import { createContext, useEffect, useState } from 'react'

import axios from 'axios';

import Socialmediaurl from './components/Socialmediaurl';
import ProfileUploader from './components/ProfileUploader';
import Intrest from './components/Intrest';
export const AttendeeProfileContext = createContext()
function Attendeeprofile(){
    let [interest,setInterest] = useState("");
    let [aboutYou,setAboutYou] = useState({
        work:"You still Not Updated!",
        passion:"You still Not Updated!",
        timeSpends:"You still Not Updated!",
        qualification:"You still Not Updated!",
        skills:"You still Not Updated!"
    })
    let [profile,setProfile] = useState(null)
   let [name,setName] = useState("")
   let [email,setEmail] = useState()
   let [profilePic,setProfilePic] = useState("")
   let [loader,setLoader] = useState(false)
    useEffect(()=>{
        axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
            setEmail(res.data.email)
            setProfilePic(res.data.profilePic)
            setName(res.data.fullName)
            axios.post(process.env.REACT_APP_BACKEND_URL+"/attendeeProfile/getAttendeeProfile",{email:res.data.email}).then(res=>{
               setInterest(res.data.aboutInterest)
                setAboutYou(prev=>{
                    return {...prev,work:res.data.aboutYou.work,passion:res.data.aboutYou.passion,timeSpends:res.data.aboutYou.timeSpends,qualification:res.data.aboutYou.qualification,skills:res.data.aboutYou.skills}
                   })
                setProfile(res.data)

            }).catch(err=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err.response.data)
        })
    },[])





console.log(profile)
    return(
     <AttendeeProfileContext.Provider value={{interest:[interest,setInterest],aboutYou:[aboutYou,setAboutYou],profilePic:[profilePic,setProfilePic],profile:[profile,setProfile],name:[name,setName],email:[email,setEmail],loader:[loader,setLoader]}}>
           <>
{profile === null ? <p>loading...</p>:(
    <div className='container-md mt-5'>
{/* loading component start*/}
        <div className={loader === true?"overlay":"overlay d-none"}>
   <div className='loading-spinner '>
  <div className="spinner-border text-primary " role="status">
    <span className="sr-only"></span>
   
  </div>
  
  </div>
  
   </div>
{/* loading component end*/}

{/* profile pic start */}
<ProfileUploader />
{/* profile pic end */}

{/* social media start */}
    <Socialmediaurl />
    {/*social media end  */}

    {/* intrest & about you component start */}
   <Intrest />
{/* intrest component end */}

    </div>
)}
        </>
     </AttendeeProfileContext.Provider>
    )
}
export default Attendeeprofile