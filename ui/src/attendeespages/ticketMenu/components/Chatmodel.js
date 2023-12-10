import { useEffect, useState,useRef } from "react"

import axios from 'axios'
import {Chat, PeopleFill,Send} from 'react-bootstrap-icons'
import colorGenerator from "../../../common/colorGenerator";
import socket from "../../../socket";
import {useNavigate} from 'react-router-dom'
function Chatmodel(props){

    let bottom = useRef()
    let scrollBottom = ()=>{
      bottom.current?.scrollIntoView({behaviour: "smooth"})
    }
  
    let [messages,setMessages] = useState([]);
    let[fetched,setFetched] = useState(false)
    let [groupMembers,setGroupMembers] = useState([]);
    let [isGroupClicked,setGroupClicked] = useState(false)
    let [eventName,setEventName] = useState("")
    useEffect(()=>{
      socket.connect()
      console.log('group joining')
   
      socket.emit('joinGroup',{groupId: props.eventId,token:props.token});
      socket.on('sendMsgToGroupF',(data)=>{
  
        setMessages((prev=>{
          return [...prev,data]
        }))
      })
  
      socket.off('retriveOldMessages').on('retriveOldMessages',(res)=>{
        console.log('retrive old message is triggered')
        setMessages(res)
        setFetched(true)
    
      })
      axios.post(process.env.REACT_APP_BACKEND_URL+"/tickets/getParticularTicket",{id:props.eventId}).then((res)=>{
        setEventName(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    
    },[])
  
    
  useEffect(()=>{
    console.log('refreshing..')
  
  if(messages.length !==0){
    setFetched(false)
    let data = messages[messages.length-1].groupId
    console.log(data)
    console.log(messages[messages.length-1])
    socket.emit('leaveGroup',{groupId:props.eventId,token:props.token})
  setMessages([])
  socket.emit('joinGroup',{groupId:props.eventId,token:props.token})
  }else{
    setFetched(false)
    socket.emit('joinGroup',{groupId:props.eventId,token:props.token})
  }
  setGroupClicked(false)
  },[props.eventId])
    useEffect(()=>{
      scrollBottom()
    },[messages])
    console.log(messages)
    
  let sendMessage = ()=>{
  let message = document.getElementById('msgField').value
  if(message !== ""){
  
    let data = {msg:message,from:props.name,email:props.email,groupId:props.eventId};
    setMessages((prev=>{
      return [...prev,data]
    }))
    document.getElementById('msgField').value = ""
    socket.emit('sendMsgToGroupB',data)
    let mesg = "you may be have a chats from "+eventName+" event by "+data.from+":"+data.msg
   axios.post(process.env.REACT_APP_BACKEND_URL+'/sendEventChatNotification',{groupId:props.eventId,msg:mesg}).then(res=>{
    console.log(res.data)
   }).catch(err=>{
    console.log(err)
   })
  
  }
  }


  
  let retriveMembers = ()=>{
  setGroupClicked(true)
    axios.post(process.env.REACT_APP_BACKEND_URL+"/groupchat/retriveMembers",{id:props.eventId}).then(res=>{
      console.log("result: ",res.data)
      setGroupMembers(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  console.log(props.eventId)
  let handleClose = ()=>{
    socket.emit('leaveGroup',{groupId:props.eventId,token:props.token})

  }
 console.log(props)

    return(
      <div className="modal fade" id="event-chat"  data-backdrop="static" data-keyboard={false} aria-hidden="false">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel" onClick={()=>{setGroupClicked(false)}}><Chat /></h5>
          <span className="text-primary close fs-6 text-center" type="button" onClick={retriveMembers}><PeopleFill /> </span>
          <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-chat">
  <div>
   {isGroupClicked === true?(
    <GroupContainer groupMembers={groupMembers}/>
   ):<MessageContainer fetched={fetched} messages={messages} email={props.email} eventName={eventName}/>}
  </div>
  
  <div ref={bottom}></div>
        </div>
   {isGroupClicked === true?<p className="text-secondary text-center border-top pt-1">click chat icon for chat again!</p>:(
         <div className="d-flex justify-content-around mb-1 border-top p-2">
  
         <input type="text" className="form-control col-10 " id="msgField" size={10} autoComplete="off" placeholder="write message..." />
         <button className="btn btn-outline-primary rounded-circle" onClick={sendMessage}><Send /></button>
         
               </div>
   )}
      </div>
    </div>
  </div>
    )
  }
  export default Chatmodel
  
  function MessageContainer(props){
    console.log(props)
    return(
      <>
      {props.fetched === false || props.eventName === ""?(
    <div className="d-flex justify-content-around">
        <div className="spinner-grow text-primary" style={{width:"2rem",height:"2rem"}} role="status">
     <span className="sr-only">Loading...</span>
   </div>
   
   <div className="spinner-grow text-primary" style={{width:"2rem",height:"2rem"}} role="status">
     <span className="sr-only">Loading...</span>
   </div>
   
   <div className="spinner-grow text-primary" style={{width:"2rem",height:"2rem"}} role="status">
     <span className="sr-only">Loading...</span>
   </div>
     </div>
   
     ):(
       <div>
   
   {
         
         props.messages.length !== 0 ?(
          props.messages.map((val,index)=>{
            return(
              <div id={index} className={val.email === props.email?"d-flex justify-content-end":"d-flex justify-content-start"}>
    
      <div className={val.email === props.email?"rounded circle p-2 msg-block bg-primary text-white mt-2":"bg-light shadow rounded circle p-2  msg-block mt-3 text-dark"} >
      <span className="d-block text-success">{val.email === props.email ?null:val.from+":"} </span>
      <span className="message">{val.msg}</span>
      </div>
    
              </div>
            )
          })
         ):<p className="alert alert-warning">Be the conversation catalyst in this group!</p>
         }
       </div>
     )}
      </>
    )
  }
  
  function GroupContainer(props){
    let navigate = useNavigate()
    console.log(props)
    return(
      <>
      {props.groupMembers.length !==0 ?(
  <div>
    {props.groupMembers.map((val)=>{
   
      let color = colorGenerator()
      
      return (
    <>
        <div className="d-flex justify-content-between border-bottom p-1" data-dismiss="modal" onClick={()=>{(navigate('/profile?id='+val._id))}}>
        <span className="border rounded-circle text-center fs-3  shadow " style={{width:"45px",height:"45px" ,backgroundColor:"#"+color,color:"white"}}>{val.name.slice(0,1).toUpperCase()}</span>
        <i className="fw-light">{val.name}.</i>
      </div>
      <br />
    </>
      )
    })}
  </div>
  ):<p>loading....</p>}
      </>
    )
  }