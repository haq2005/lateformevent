import { useEffect, useState,useRef, createContext } from "react"
import axios from 'axios'
import { Send } from "react-bootstrap-icons";
import socket from '../socket'
import VoiceRecoreder from "./VoiceRecorder";
import VoiceMsgPlayer from "../communitychat/components/VoiceMsgPlayer";
export const createPrivateChatContext = createContext()
function Privatechat(){
    let [messages,setMessages] = useState([]);
    let [data,setData] = useState();
   let [isJoined,setIsJoined] = useState(false)
    let [id,setId] = useState();
    let [isRecord,setIsRecord] = useState(false)
let[frndId,setFrndId] = useState()
    let bottom = useRef()
    let scrollBottom = ()=>{
      bottom.current?.scrollIntoView({behaviour: "smooth"})
    }
    useEffect(()=>{
        scrollBottom()
      },[messages])
    useEffect(()=>{
        socket.connect()
        let href = window.location.href;
//let link = href.replace('#/','');
let url = new URL(href);
let id_1 = url.searchParams.get('first');
let id_2 = url.searchParams.get('second');

let localStorageId = localStorage.getItem('id');
if(localStorageId === id_1){
    setFrndId(id_2)
}else{
    setFrndId(id_1)
}
let email = ""
axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
   email = res.data.email
    setData(res.data)

    axios.post(process.env.REACT_APP_BACKEND_URL+'/privatechat/createPrivateRoom',{id_1,id_2}).then((res)=>{
        console.log(res.data)
        setIsJoined(true)
        setId(res.data)
        socket.emit('joinPrivateChat',{id:res.data})
        localStorage.setItem("privateRoomConnected","true")
    }).catch((err)=>{
        console.log(err)
    })
    
}).catch(err=>{
    console.log(err)
})

//sockets

socket.on('retriveOldPrivMessages',(dt)=>{
    console.log(dt)
    setMessages(dt)
    socket.emit("unReadToRead",{id:dt[0].groupId,email:email})
    

})

socket.on("sendMsgToPrivF",(dt)=>{
   
    setMessages((prev)=>{
        return [...prev,dt]
    })
    console.log("this from sendMsg to privF",dt)
    console.log("going to emit unread")
    socket.emit("unReadToRead",{id:dt.groupId,email:email})
    console.log(" emit unread")


})


    },[])

    window.addEventListener('beforeunload', () => {
        // Emit a socket event to notify the server about the user leaving.
        console.log("window is reloaded")
        socket.disconnect()
        localStorage.removeItem('privateRoomConnected')

      });


    let sendMessage = ()=>{
        let msg =  document.getElementById("msg-field").value
        if(msg !== "" &&  isJoined === true){
          let dt = {msg,from:data.fullName,email:data.email,groupId:id,type:"text"};
        
            setMessages((prev)=>{
                return [...prev,dt]
            })
            document.getElementById('msg-field').value = ""

            socket.emit("sendMsgToPrivB",dt)
            let notificationMessage = "you have private message from "+data.fullName+": "+msg
            axios.post(process.env.REACT_APP_BACKEND_URL+'/sendPrivateChatNotification',{id:frndId,msg:notificationMessage})
    }
}
console.log(frndId)

    return(
        <>
       <createPrivateChatContext.Provider value={{data:[data,setData],id:[id,setId],frndId:[frndId,setFrndId],messages:[messages,setMessages],isRecord:[isRecord,setIsRecord]}}>
       <div className="container-fluid">
<div className="row community-message">
<div className="col-lg-4 d-none d-lg-block bg-light border-right p-3">

</div>
<div className="col-lg-8">
    <div style={{marginBottom:"100px"}}>
    {messages.length !== 0?messages.map((val,index)=>{
  let ind =   messages.findIndex((val)=>{
        return val.unRead === true
    })
  
  return(
        
<>
{ind === index && val.email !== data.email?<p className="text-center p-2  text-dark fw-bold mt-2 mb-2">----unread Messages----</p>:null}
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
<div className="input-msg mt-3">
{isRecord === true?null:    <input type="text" className="form-control col-10" id="msg-field" size={10} placeholder="write your message"/>}
    <div onClick={()=>{setIsRecord(true)}} className="ms-1"><VoiceRecoreder /></div>
    <button className="btn btn-outline-primary ms-2  rounded-circle" onClick={sendMessage}><Send /></button>

</div>
</div>
</div>
        </div>
       </createPrivateChatContext.Provider>
        </>
    )
}

export default Privatechat