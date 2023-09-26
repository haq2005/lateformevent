import axios from 'axios'
let updateAboutYouService = (email,obj)=>{
   let response =  axios.post(process.env.REACT_APP_BACKEND_URL+'/attendeeProfile/updateAboutYou',{email:email,_aboutYou:obj}).then(res=>{
        console.log(res.data)
        return ({status:true,data:res.data})
       }).catch(err=>{
        console.log(err)
        return ({status:false,data:err})
       })
       return response
}
export default updateAboutYouService