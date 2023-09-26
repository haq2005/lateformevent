import { useContext } from "react"
import { AttendeeProfileContext } from "../Attendeeprofile"
import uploadAttendeeProfilePicServices from '../../../services/attendeeprofile/uploadAttendeeProfilePicService';
import { Upload} from 'react-bootstrap-icons'
function ProfileUploader(){
    let {profilePic,loader,email,name} = useContext(AttendeeProfileContext)
    let [userProfilePic,setUserProfilePic] = profilePic
    let [loading,setLoading] = loader
    let[userEmail,setUserEmail] = email
    let [userName,setUserName] = name
    let emitFile = ()=>{
        document.getElementById('uploadFile').click()
        
      }
      let selectFile = async(event)=>{
         
      
         let file = event.target.files[0]
         const formData = new FormData();
         formData.append('image', file);
         formData.append('email',userEmail)
         setLoading(true)
         let res = await uploadAttendeeProfilePicServices(formData)
       alert(res)
         setLoading(false)
     
     }
    return(
        <>
        <div className='row justify-content-center'>
<div className=" col-md-4 p-3 bg-white  mt-3 rounded" style={{maxHeight:"300px"}}>
    <div className='text-center'>
        <img src={userProfilePic === ""?null:process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+userProfilePic} alt="your profile" className="img-fluid rounded-circle " style={{width:"168px",height:"168px"}}/>
        <b className='mt-3 fw-bold d-block fs-3'>{userName}</b>
        <input type="file" accept='image/*' id="uploadFile" className="d-none" onChange={(e)=>{selectFile(e)}} />
        <button className='btn btn-dark btn-full mt-2' onClick={emitFile}>Set Profile Pic <Upload className='ms-1 mb-1'/></button>
    </div>
    </div>
    {/* <div className=" col-md-6  p-3 bg-white h-100  mt-3 rounded"  style={{maxHeight:"300px",overflowY:"scroll"}}>
 <b className='p-1 d-block -bottom'>Same interested person's</b>

    </div> */}
</div>
        </>
    )
}

export default ProfileUploader