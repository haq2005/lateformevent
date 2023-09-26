import axios from 'axios'
let changeInterestApi = (email,prompt)=>{
 
  let response = axios.post(process.env.REACT_APP_BACKEND_URL+'/attendeeProfile/updateInterest',{email:email,aboutInterest:prompt}).then(res=>{
      console.log(res.data)
      return ({result:true,data:res.data})
     }).catch(err=>{
      return ({result:false,data:err})
    
     })
 
   return response
  }

  export default changeInterestApi