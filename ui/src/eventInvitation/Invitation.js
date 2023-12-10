import { useEffect, useState } from 'react'
import Nav from '../Nav'
import {EmojiFrownFill, Envelope, EnvelopeFill, HandThumbsDown, HandThumbsDownFill, HandThumbsUp, HandThumbsUpFill, Share, ShareFill} from 'react-bootstrap-icons'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-share'
import {toast,ToastContainer} from 'react-toastify'
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
function Invitation(){
let [day,setDay] = useState();
let[hours,setHours] = useState();
let [min,setMin] = useState();
let [sec,setSec] = useState();
let [noId,setNoId] = useState(false)
let [data,setData] = useState("")
let [time,setTime] = useState(false)
let [isFetch,setFetch] = useState(false)
let [deadLine,setDeadLine] = useState(null)
let [id,setId] = useState("")
let[bannerLoad,setBannerLoad] = useState({load:false});
let [totalLikes,setToatalLikes] = useState({likes:0,dislikes:0})
let [eMode,setEmode] = useState("");
let [timeOver,setTimeOver] = useState(false);
let [orgDt,setOrgDt] = useState("");
let navigate = useNavigate()
useEffect(()=>{
let href = window.location.href;
//let link = href.replace('#/','');

let param = new URL(href)
let id = param.searchParams.get('id')

if(!id){
 
   setNoId(true)
}else{
  setId(id)
    axios.post(process.env.REACT_APP_BACKEND_URL+'/eventSetup/getEvent',{id:id}).then((res)=>{
      if(res.data === 'no search'){
        setNoId(true)
      }else{
       axios.post(process.env.REACT_APP_BACKEND_URL+'/event//getOrganizer',{email:res.data[0].email}).then(res=>{
setOrgDt(res.data)
       }).catch(err=>{
console.log(err)
       })
       
       
        setData(res.data[0])
        setFetch(true)
        let d1 = new Date(res.data[0].eventHeld);
        let d2 = new Date().getTime();
        if(d1>d2){
          setTimeOver(false)
        }else{
setTimeOver(true)
        }
      }
    }).catch((err)=>{
        setNoId(true)
        console.log(err.response.data)
    })
}

},[]);

useEffect(()=>{
  let href = window.location.href;
 // let link = href.replace('#/','');
  
  let param = new URL(href)
  let id = param.searchParams.get('id')
//total likes
  axios.post(process.env.REACT_APP_BACKEND_URL+'/event/totalLikes',{id:id}).then((res)=>{
   setToatalLikes((prev)=>{
    return {...prev,likes:res.data.likes,dislikes:res.data.dislikes}
   })
  }).catch((err)=>{
    console.log(err)
  })
  axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    console.log('working...',res.data.email)
axios.post(process.env.REACT_APP_BACKEND_URL+'/event/isEngaged',{id:id,email:res.data.email}).then((res)=>{
 setEmode(res.data)
}).catch((err)=>{
  console.log(err)
})
  })


},[])

const getTime = (dt) => {
  let href = window.location.href;
//let link = href.replace('#/','');

let param = new URL(href)
let id = param.searchParams.get('id')
if(deadLine === null){
  axios.post(process.env.REACT_APP_BACKEND_URL+'/eventSetup/getEvent',{id:id}).then((res)=>{
    setDeadLine(res.data[0].eventHeld)
    const time = Date.parse(res.data[0].eventHeld) - Date.now();

    setDay(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMin(Math.floor((time / 1000 / 60) % 60));
    setSec(Math.floor((time / 1000) % 60));
    setTime(true)
  })
}else{
  const time = Date.parse(dt) - Date.now();

  setDay(Math.floor(time / (1000 * 60 * 60 * 24)));
  setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
  setMin(Math.floor((time / 1000 / 60) % 60));
  setSec(Math.floor((time / 1000) % 60));
  setTime(true)
}


  };
  useEffect(() => {
    console.log(deadLine)
    const interval = setInterval(() => getTime(deadLine), 1000);

    return () => clearInterval(interval);
  }, [deadLine]);

  let readMore = ()=>{
    console.log('working...')
    document.getElementById('readmore').style.display = 'none';
    document.getElementById('memberInfo').style.display="block";
  }
useEffect(()=>{
  console.log(bannerLoad)

},[bannerLoad])
let renderImg = ()=>{

  setBannerLoad(true)

}
let likeEvent = ()=>{
  let mail = ""
  axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    mail = res.data.email
    axios.post(process.env.REACT_APP_BACKEND_URL+'/event/likeEvent',{id:id,email:res.data.email}).then((res)=>{
    toast.info(res.data)
      axios.post(process.env.REACT_APP_BACKEND_URL+'/event/totalLikes',{id:id}).then((res)=>{
        console.log(res.data)
        setToatalLikes((prev)=>{
          return{...prev,likes:res.data.likes,dislikes:res.data.dislikes}
        })

        axios.post(process.env.REACT_APP_BACKEND_URL+'/event/isEngaged',{id:id,email:mail}).then((res)=>{
          setEmode(res.data)
         }).catch((err)=>{
           console.log(err)
         })

      }).catch((err)=>{
        console.log(err.response.data)
      })
    }).catch((err)=>{
      toast.info(err.response.data)

    })

}).catch((err)=>{
    console.log(err)
})



}
let disLikeEvent = ()=>{
  let mail = ""
  axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
    mail = res.data.email
    axios.post(process.env.REACT_APP_BACKEND_URL+'/event/dislikeEvent',{id:id,email:res.data.email}).then((res)=>{
     console.log(res.data)
      toast.info(res.data)
      axios.post(process.env.REACT_APP_BACKEND_URL+'/event/totalLikes',{id:id}).then((res)=>{
        console.log(res.data)
        setToatalLikes((prev)=>{
          return{...prev,likes:res.data.likes,dislikes:res.data.dislikes}
        })

        axios.post(process.env.REACT_APP_BACKEND_URL+'/event/isEngaged',{id:id,email:mail}).then((res)=>{
          console.log(res)
          setEmode(res.data)
         }).catch((err)=>{
           console.log(err)
         })

      }).catch((err)=>{
        console.log(err.response.data)
      })
    }).catch((err)=>{
      toast.info(err.response.data)

    })

}).catch((err)=>{
    console.log(err)
})


}

    return(
        <>
     <div className="container-md">

        <Nav />
        <div className="modal fade" tabIndex={-1} id="share-modal" >
  <div className="modal-dialog modal-dialog-centered" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Share with your friends <ShareFill /></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body d-flex justify-content-between">
      <div>
<WhatsappShareButton url={'http://192.168.43.178:8001/#/event-invitation?id='+id}>
  <WhatsappIcon size={50} borderRadius="100%"/>
</WhatsappShareButton>
</div>

<div>
<FacebookMessengerShareButton  url={'https://lateform.com/#/event-invitation?id='+id} >
  <FacebookIcon size={50} borderRadius="100%"/>
</FacebookMessengerShareButton>
</div>

<div>
<TwitterShareButton url={'https://lateform.com/#/event-invitation?id='+id} >
  <TwitterIcon size={50} borderRadius="100%"/>
</TwitterShareButton>
</div>

<div>
<TelegramShareButton url={'https://lateform.com/#/event-invitation?id='+id} >
  <TelegramIcon size={50} borderRadius="100%"/>
</TelegramShareButton>
</div>

<div>

<FacebookMessengerShareButton url={'https://lateform.com/#/event-invitation?id='+id}>
  <FacebookMessengerIcon size={50} borderRadius="100%"/>
</FacebookMessengerShareButton>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{
  
isFetch !== true?(
    <>
    {noId===true? <div className='text-secondary text-center'>
    <EmojiFrownFill size={200} className="text-center"/>
    <h3 className='display-5'>no result</h3>
    </div>:
    <div className="loader-line"></div>}
    </>
):(
<>

  <div className='presentation' style={bannerLoad.load === false?{display:"none"}:{display:'block'}}>

  <div id="thumb" style={{
   backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/imageHandler/getImage/`+data.approximateOfEvent.thumb
  }} >
  </div>
  
  <img src={process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+data.approximateOfEvent.thumb}  className="img-content"  onLoad={renderImg}/>
  
  </div>

{bannerLoad.load === false ?<Skeleton className='skel'/>:null}
<div className='row content'>
<div className='col-lg-8 mt-3'>
<h1 className='display-3 fw-bolder'>{data.eventName}</h1>
<p className='mt-2 text-secondary'>{data.singleLineDescription}</p>
<b>Description: </b>
<p className='fw-lighter p-1'>{data.eventDescription}</p>
<div className='p-3 organizer-board mb-5'>
<b>about organizer: </b>
<p>{data.organizerInfo}</p>
</div>


<div className='mt-3 mb-5 border-top border-bottom p-3 d-flex flex-column'>
<div>
<p>Are you intrested on this event?</p>
</div>
<div>
<span className='ms-5' onClick={likeEvent}>{eMode === "liked"?<HandThumbsUpFill size={20} className="user-engagement"/>:<HandThumbsUp size={20} className="user-engagement"/>} {totalLikes.likes}
</span>
<span className='ms-5' onClick={disLikeEvent}>{eMode === "disliked"?<HandThumbsDownFill size={20} className="user-engagement"/>:<HandThumbsDown size={20} className="user-engagement"/>}{totalLikes.dislikes}</span>
<Share size={20} className="ms-5 user-engagement" data-toggle="modal" data-target="#share-modal"/>
</div>
</div>


<div className='mb-4'>
  <h6 className='display-6'>When & Where?</h6>
  <b className='text-secondary fs-3'>event on : {data.eventHeld}</b>
  <div>
    <div>
    {time === true?<>
    <div className='time'>
    <b>event will be on..</b>
   <table className='table'>
    <thead>
      <tr>
        <th>days</th>
        <th>hours</th>
        <th>mins</th>
        <th>sec</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{day}</td>
        <td>{hours}</td>
        <td>{min}</td>
        <td>{sec}</td>
      </tr>
    </tbody>
   </table>
    </div>
      </>:null}
      <div className='mt-5 mb-5'>
        <video src={'https://cloudflare-ipfs.com/ipfs/'+data.approximateOfEvent.promoVideo} controls className='img-fluid'>
         
        </video>
      </div>
    </div>
  <iframe src={data.eventLocation} className="map" title='lateform'></iframe>
  </div>
</div>
<hr />
<div className='text-center'>
<button className='btn btn-white' onClick={readMore} id="readmore">read more...</button>

</div>
<div className='text-center' id="memberInfo">
<div className='row'  >
{data.memberInfo.map((val,index)=>{
  return(
<div className='col-lg-6 p-3' key={index}>
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{val.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{val.role}</h6>
    <p className="card-text p-1">{val.desc}</p>
  </div>
</div>
</div>
  )
})}
</div>
</div>
</div>
<div className='col-lg-4'>
  <div className='mt-5 border p-4 text-center'>
<h6 className='fw-bold'>BUY YOUR TICKET NOW!</h6>
<div className='mt-3'>
{timeOver===false ?<button className='ticket-btn' onClick={()=>{navigate("/buyticket?id="+id)}}>BUY NOW!</button>:<button className='btn btn-secondary' disabled={true}>booking ticket is stopped</button>}
</div>
  </div>

  <div className='mt-4 text-center'>
<b> About Community:</b>
<div className='mt-2 border text-center p-4'>
<div className='text-center'>
  <img src={process.env.REACT_APP_BACKEND_URL+"/imageHandler/getImage/"+orgDt.profilePic} style={{width:"75px",height:"75px"}} className="rounded-circle"/>
</div>

<p className='fw-bold mt-2'>{orgDt.organizationName}</p>
<div className='d-flex p-2 justify-content-around'>
<button className='btn btn-dark btn-full'  data-toggle="modal" data-target="#communityModal">Community Bio</button>

<span className="nav-item  rounded-circle border  ms-1  text-dark p-1"  style={{width:"40px",height:"40px"}} ><Envelope size={30} className="p-1"/> </span>



</div>
</div>
</div>

</div>
</div>

{/* community modal */}
<div className='modal fade' tabIndex="-1" id="communityModal">
<div className='modal-dialog'>
<div className='modal-content'>
<div className='modal-header'>
<h5 className='modal-title'>About community</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
</div>
<div className='modal-body p-4'>
{orgDt.bio}
</div>
</div>
</div>
</div>
</>
)    
}
     </div>
     <ToastContainer position='bottom-right'/>
        </>
    )
}
export default Invitation