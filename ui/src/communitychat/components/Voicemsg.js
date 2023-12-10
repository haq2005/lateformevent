import { useContext, useState } from 'react';
import {AudioRecorder} from 'react-audio-voice-recorder'
import { createCommunityChatContext } from './MessageRender';
import axios from 'axios';
import socket from "../../socket";

function Voicemsg(){
    let {messages,data,communityId,recorder} = useContext(createCommunityChatContext)
    let [voiceMsg,setVoiceMsg] = messages
    let[Data,setData] = data
    let [CommunityId,setCommunityId] = communityId
    let[isRecorder,setIsRecorder] = recorder
    let[uploaded,setIsUploaded] = useState(true) 
    const addAudioElement = (blob) => {
  setIsUploaded(false)
      const formData = new FormData();
      formData.append('audio', blob, 'recorded_audio.wav');
console.log(formData)
    axios.post(process.env.REACT_APP_BACKEND_URL+'/audioHandler/uploadVoiceMsg',formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res)=>{
      console.log(res.data)  
let audioFileName = res.data.filename
     
      let dt = {msg:audioFileName,from:Data.fullName,email:Data.email,groupId:CommunityId,type:"audio"};
      setVoiceMsg((prev)=>{
         return[...prev,dt]
      })

    
      socket.emit('sendMsgToGroupB',dt)
      let mesg = "you  have a voice message from community by "+dt.from
      axios.post(process.env.REACT_APP_BACKEND_URL+'/sendEventChatNotification',{groupId:dt.groupId,msg:mesg}).then(res=>{
       console.log(res.data)
      }).catch(err=>{
       console.log(err)
      })

     setIsRecorder(false)
     setIsUploaded(true)
  }).catch((err)=>{  
     console.log(err.response.data) 
     setIsRecorder(false)
     setIsUploaded(true)
     alert("something went wrong")
  })

      };

    return(
        <>


<div className='ms-1'>
{uploaded===false?(<div>
  <span className='text-secondary'>voice message is sending...</span>
</div>)
:
    <div>

    <AudioRecorder 
        
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        />
    </div>}

</div>
        </>
    )
}

export default Voicemsg