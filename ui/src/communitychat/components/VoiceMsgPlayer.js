import { useContext, useEffect, useRef, useState } from "react";
import { PauseCircle, PlayCircle } from "react-bootstrap-icons";
function VoiceMsgPlayer(props){
    let [play,setPlay] = useState(true)
    let audioRef = useRef()
    let progressRef = useRef()


  
   let playVoice = ()=>{
    setPlay(false)
    audioRef.current.play()
   
   

   }
   let pauseVoice = ()=>{
setPlay(true)
audioRef.current.pause()
   }

   let changeDuration = (e)=>{
 
     let audioPosition = audioRef.current.duration*(progressRef.current.value/100)
     audioRef.current.currentTime = audioPosition
   }

   let timeUpdate = ()=>{
let slidePosition = progressRef.current.max*(audioRef.current.currentTime/audioRef.current.duration)
progressRef.current.value = slidePosition  
if(audioRef.current.currentTime === audioRef.current.duration){
    progressRef.current.value = 0;
    setPlay(true)
}
}
   console.log(audioRef)
   console.log(progressRef)
    return(

        <>
<div className={props.data.email === props.email?" alert-primary rounded p-3 col-12 mt-3 mb-3 col-lg-10":"alert-secondary rounded p-2 col-12 col-lg-10 mt-3 mb-3 "}>
    <audio src={process.env.REACT_APP_BACKEND_URL+'/audioHandler/getVoiceMessage/'+props.media}  ref={audioRef} onTimeUpdate={timeUpdate}/>
{props.data.email === props.email ? null:<span className="text-secondary">~ {props.from}</span>}
<div className=" d-flex ">
<div>
{play === true?<span onClick={()=>{playVoice()}} className="cursor-pointer"><PlayCircle className={props.data.email === props.email ?"me-2 mb-2 text-primary":"me-2 mb-2 text-secondary"} size={20} /></span>
:<span  className="cursor-pointer" onClick={()=>{pauseVoice()}}><PauseCircle className={props.data.email === props.email ?"me-2 mb-2 text-primary":"me-2 mb-2 text-secondary"} size={20} /></span>
}
</div>
<div>
    <div>
    <input type="range"  style={{width:"100%"}}  ref={progressRef} value={"0"}  min={"0"} max={"100"}  onChange={changeDuration} />

    </div>
</div>        

</div>
</div>
        </>
    )
}
export default VoiceMsgPlayer