import {messaging} from '../firebase.js'
import  {getToken} from 'firebase/messaging'
import axios from 'axios'
let notification = async(email)=>{
    let permission =  await Notification.requestPermission()
if(permission === 'granted'){
 let tk = await getToken(messaging,{vapidKey:"BN6mxIT-jJW-ONUWI007QGzFnCTd3TX5PhCmf-ikGwgVwZVIlNYMk9KTodka_utfu8KTL0laaSuuvKYMeufhuDA"})
 console.log(tk)
 axios.post(process.env.REACT_APP_BACKEND_URL+"/update/notificationToken",{email:email,token:tk}).then((res)=>{
     console.log(res.data);
 }).catch((err)=>{
     console.log(err)
 })
}else if(permission === 'denied'){

}

 }

 export default notification