import axios from 'axios'
let uploadAttendeeProfilePicServices = (formData)=>{
   let response =  axios.post(process.env.REACT_APP_BACKEND_URL+'/imageHandler/uploadAttendeeProfile',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res)=>{
        return(res.data)  
    }).catch((err)=>{  
       return(err.response.data) 
    })

    return response
}
export default uploadAttendeeProfilePicServices