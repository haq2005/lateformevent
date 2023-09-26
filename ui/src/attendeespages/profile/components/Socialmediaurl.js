import { AttendeeProfileContext } from "../Attendeeprofile"
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import axios from "axios";
import { useContext } from "react";
function Socialmediaurl(){
let {loader,email} = useContext(AttendeeProfileContext)
let [userEmail,setUserEmail] = email
let [loading,setLoading] = loader

let checkUrl = (link)=>{
    try{
        return Boolean(new URL(link))
    }catch(err){
        return false
    }
}

    let updateSocialUrl = ()=>{
        console.log(userEmail)
        let elem = document.getElementsByClassName('socialUrl');
        for(let i = 0;i<elem.length;i++){
            if(elem[i].value !== ""){
        let isUrl = checkUrl(elem[i].value)
        console.log(elem[i].value)
        if(isUrl){
            setLoading(true)
            // this api request is used fpr update the social url of the users!
            axios.post(process.env.REACT_APP_BACKEND_URL+"/attendeeProfile/updateSocialUrl",{id:i+1,email:userEmail,url:elem[i].value}).then((res)=>{
                setLoading(false)
                console.log(res.data)
            }).catch((err)=>{
                setLoading(false)
                console.log(err)
            })
        }
            }
        }
        }
    return(
        <>
        <div className='p-2 mt-3 rounded bg-white d-flex flex-column'>
        <div className='mb-3'>
            <b>Your Social media URL <span className='text-secondary'>(Optional)</span></b>
            <p>It helps others to visit your other Social media profile</p>
        </div>
    <div className='mb-3 d-flex'>
       <span><FacebookIcon /></span>
       <input type="text" className="form-control w-75  ms-2 socialUrl"  placeholder='paste your Facebook URL'/>

    </div>
    <div className='mb-3 d-flex'>
<span>    <LinkedinIcon /></span>
<input type="text" className="form-control  w-75 ms-2 socialUrl" placeholder='paste your Linkedin URL'/>
    </div >
    <div className='mb-3 d-flex'>
<span><TwitterIcon /></span>     
<input type="text" className="form-control  w-75 ms-2 socialUrl" placeholder='paste your twitter URL'/>

    </div>
    <div className='mb-3 d-flex'>
<button className='btn btn-dark' onClick={updateSocialUrl}>Save changes</button>

    </div>
    </div>
        </>
    )
}
export default Socialmediaurl