import axios from "axios"
import { useEffect, useState } from "react"
import { ChatDotsFill, Inbox, SendCheckFill } from "react-bootstrap-icons"
import {useNavigate} from 'react-router-dom'
import colorGenerator from "../common/colorGenerator"
function Chat(){
    let [communities,setCommunities] = useState([])
    let[privateRoom,setPrivateRoom] = useState([])
    let navigate = useNavigate()
    useEffect(()=>{
        axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
            axios.post(process.env.REACT_APP_BACKEND_URL+'/community/getMsgCommunities',{email:res.data.email}).then((res)=>{
               console.log(res.data)
                setCommunities(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            axios.post(process.env.REACT_APP_BACKEND_URL+'/privatechat/retrivePrivateRoom',{email:res.data.email}).then((res)=>{
              console.log(res.data)
                setPrivateRoom(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })

   
    },[])

    let redirect = (id)=>{
        navigate("/community?id="+id)
    }
    return(
       <div className="container-fluid mt-5">
        {/* community chat */}
        
        {
            communities.length === 0 ?<p>you not yet join yet any community!</p>:(
                <div className="d-flex community-disp">
{
    communities.map((val)=>{
        let colors = colorGenerator()
       return(
        <>
         {!val.profilePic?<span className="border d-block rounded-circle text-center profile-font " style={{width:"55px",height:"55px" ,backgroundColor:"#"+colors,color:"white"}} onClick={()=>{redirect(val._id)}}>{val.communityName.slice(0,1).toUpperCase()}</span>
        : <img src={process.env.REACT_APP_BACKEND_URL+'/imageHandler/getImage/'+val.profilePic} className="border d-block rounded-circle  " style={{width:"75px",height:"75px" }} onClick={()=>{redirect(val._id)}}/> }
        
        </>
       )
    })
}        
        </div>
            )
        }
        {/* single user chat */}
<div className="d-flex justify-content-center">
<div className="col-lg-6">
<div className="p-2 mb-5">
Choose to Chat <ChatDotsFill className="ms-1 me-1 mb-1"/>
</div>
{
    privateRoom.length === 0?<p className="badge badge-primary p-2 fs-5"><Inbox className="me-1 mb-1"/>Your chat box is empty!</p>:(
        <>
        {
    privateRoom.map((val)=>{
        let colors = colorGenerator()
return(
    <div className="d-flex justify-content-start border-bottom position-relative p-2" onClick={()=>{navigate("/lateformchat?first="+val.privateRoomData[0]._id_1+"&second="+val.privateRoomData[0]._id_2)}}>
{!val.privateRoomData[0].profilePic?<span className="border d-block rounded-circle text-center profile-font " style={{width:"55px",height:"55px" ,backgroundColor:"#"+colors,color:"white"}} >{val.privateRoomData[0].name.slice(0,1).toUpperCase()}</span>:    <img src={process.env.REACT_APP_BACKEND_URL+'/imageHandler/getImage/'+val.privateRoomData[0].profilePic}  className="rounded-circle"style={{width:"55px",height:"55px"}}/>}
    <div className="chat-font">
    <p><span className="text-secondary">chat with</span> {val.privateRoomData[0].name}</p>
    </div>
    </div>
)
    })
}
        </>
    )
}


</div>

</div>
       </div>
    )
}

export default Chat