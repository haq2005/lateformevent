import Voicemsg from "./Voicemsg";
import VoiceMsgPlayer from "./VoiceMsgPlayer";
import { Send } from "react-bootstrap-icons";
import { useEffect ,useState,useRef,createContext} from "react";
import axios from "axios";
import socket from "../../socket";
import {toast} from 'react-toastify'
import nochat from '../../image/nochat.png'
export const createCommunityChatContext = createContext()
function MessageRender(props){
    let bottom = useRef()
    let scrollBottom = ()=>{
      bottom.current?.scrollIntoView({behaviour: "smooth"})
    }
    let [communityId,setCommunityId] = useState("");
    let [data,setData] = useState()
    let [messages,setMessages] = useState([]);
    let [isJoined,setIsJoined] = useState(false)
  

    useEffect(()=>{
      socket.connect()
if(props.organizer === true){
    socket.emit('joinGroup',{groupId: props.data.account.communityId,token: props.data.token});
    setData(props.data.account)
    setCommunityId(props.data.account.communityId)
    setIsJoined(true)
   
}else{
    let url = window.location.href;
    //let urlString = url.replace('#/','');
    let newUrl = new URL(url);
    
    console.log(newUrl)
    let Id = newUrl.searchParams.get("id")
    setCommunityId(newUrl.searchParams.get("id"))
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
     setData(res.data)
     let token = res.data.FCMT
    axios.post(process.env.REACT_APP_BACKEND_URL+'/community/isJoinCommunity',{email:res.data.email,id:Id}).then(res=>{
     setIsJoined(true)
     socket.emit('joinGroup',{groupId: Id,token:token});

    }).catch(err=>{
     toast.error(err.response.data)
    })
 }).catch((err)=>{
     console.log(err)
 })
}

//sockets

socket.on('sendMsgToGroupF',(data)=>{
  
    setMessages((prev=>{
      return [...prev,data]
    }))
  })
  socket.off('retriveOldMessages').on('retriveOldMessages',(res)=>{
    console.log('retrive old message is triggered')
    setMessages(res)


  })

    },[])


    useEffect(()=>{
        scrollBottom()
      },[messages])
      let[isRecorder,setIsRecorder] = useState(false)


    let sendMessage =()=>{
        let msg =  document.getElementById("msg-field").value
       if(msg !== "" && isJoined === true){
         let dt = {msg,from:data.fullName,email:data.email,groupId:communityId,type:"text"};
         setMessages((prev=>{
             return [...prev,dt]
           }))
           document.getElementById('msg-field').value = ""
           socket.emit('sendMsgToGroupB',dt)
           let mesg = "you  have a chats from community by "+dt.from+": "+dt.msg
           axios.post(process.env.REACT_APP_BACKEND_URL+'/sendEventChatNotification',{groupId:dt.groupId,msg:mesg}).then(res=>{
            console.log(res.data)
           }).catch(err=>{
            console.log(err)
           })
       }
  
     }

    return(
<createCommunityChatContext.Provider value={{messages:[messages,setMessages],data:[data,setData],communityId:[communityId,setCommunityId],recorder:[isRecorder,setIsRecorder]}}>
{isJoined === false?<div className="d-flex justify-content-center">
<div className="text-center">
<img src={nochat} className="img-fluid" alt="join community"/>
<p className="fw-bold fs-4 mt-2">Try again!</p>
  </div>  
</div>:(
  <>
<div className="p-2 border-left">

<div  style={{marginBottom:"100px"}}>
{messages.length !== 0?messages.map((val,index)=>{

return(
<>
{val.type === "text"?(
    <div   className={val.email === data.email?"d-flex mt-2 justify-content-end":"d-flex  mb-5 mt-2 justify-content-start"}>
    <div className={val.email === data.email?"bg-primary msg-block text-white p-2 rounded":"bg-light shadow msg-block  p-2 rounded"}>
    {val.email === data.email ?null:<span className="d-block text-success">{val.from}</span>}
    <span>{val.msg}</span>
    </div>
    </div>
  ):<div className="d-flex justify-content-center">
    <VoiceMsgPlayer media={val.msg} email={val.email} data={data} from={val.from}/>
    </div>}
</>

)
}):null}
</div>
<div ref={bottom} ></div>
<div className="input-msg mt-5">
{isRecorder?null:    <input type="text" className="form-control col-10" id="msg-field" size={10} placeholder="write your message"/>}
   <div onClick={()=>{setIsRecorder(true)}}><Voicemsg /></div>
    <button className="btn btn-outline-primary ms-2 rounded-circle" onClick={sendMessage}><Send /></button>

</div>
</div>
  </>
)} 


</createCommunityChatContext.Provider>
    )
}
export default MessageRender

