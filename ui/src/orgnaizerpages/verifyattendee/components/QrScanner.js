import { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { toast } from 'react-toastify';
import axios from 'axios'
function QrScanner(props){
    let [prevVal,setPrevVal] = useState("")
       let qrReaderErrorHandler = (err)=>{
           alert(err)
           toast.error('something went wrong! 😬')
       }
       let scanHandler = (res)=>{
        
   
           if(res !==null){
            setPrevVal(res.text)
             if(prevVal !== res.text){
               let text = res.text;
             let arr = text.split(",")
             axios.post(process.env.REACT_APP_BACKEND_URL+'/eventHandling/verifyAttendees',{email:arr[1],id:arr[0],organizerEmail:props.email}).then((res)=>{
              
             toast.success(res.data)
           return 
             }).catch(err=>{
               console.log(err)
             })
             }else{
               console.log('same value')
             }
           }
       } 
       return(
           <>
               <QrReader
           
           delay={1000}
           style={{width:"100%",height:"100%"}}
           onError={qrReaderErrorHandler}
           onScan={scanHandler}
        
           />
           </>
       )
   }
   export default QrScanner