import { AudioRecorder } from "react-audio-voice-recorder";
import axios from 'axios'
import { useContext } from "react";
import { createPrivateChatContext } from "./Privatechat";
import socket from "../socket";
function VoiceRecoreder(){
    let {data,id,frndId,messages,isRecord} = useContext(createPrivateChatContext)
    let [Data,setData] = data
    let [Id,setId] = id
    let [FrndId,setFrndId] = frndId
    let [Messages,setMessages]  = messages
    let [IsRecord,setIsRecord] = isRecord
    let addAudioElement = (blob)=>{
        const formData = new FormData();
        formData.append('audio', blob, 'recorded_audio.wav');
  console.log(formData)
  setIsRecord(false)
      axios.post(process.env.REACT_APP_BACKEND_URL+'/audioHandler/uploadVoiceMsg',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res)=>{
        console.log(res.data)  
  let audioFileName = res.data.filename
       
        let dt = {msg:audioFileName,from:Data.fullName,email:Data.email,groupId:Id,type:"audio"};
        setMessages((prev=>{
            return [...prev,dt]
          }))
        socket.emit("sendMsgToPrivB",dt)
        let notificationMessage = "you have private voice message from "+Data.fullName
        axios.post(process.env.REACT_APP_BACKEND_URL+'/sendPrivateChatNotification',{id:FrndId,msg:notificationMessage})

      })
    }
    return(
        <>
        <AudioRecorder 
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }} 
        />
        </>
    )
}
export default VoiceRecoreder