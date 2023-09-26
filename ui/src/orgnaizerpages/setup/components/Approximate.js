import { useState,useEffect } from 'react'
import axios from 'axios'
import { CameraVideoFill, Facebook, Instagram } from 'react-bootstrap-icons'
function Approximate({setData,data},){
    let [disableUpload,setDisableUpload] = useState(false)
    let [approximate,setApproximate] = useState({
      thumb:"",
      lunch:false,
      chaiBreak:false,
      mBreakFast:false,
      nDinner:false,
      payment:false,
      breakTimes:0,
      promoVideo:""
    });
    let [email,setEmail] = useState();
    let [loader,setLoader] = useState(false);
    useEffect(()=>{
      let data = {id:window.localStorage.getItem('id')}
      axios.post(process.env.REACT_APP_BACKEND_URL+'/login/organizerEnv',{data:data},{headers:{Oauth_2:window.localStorage.getItem('Oauth_2')}}).then((res)=>{
        console.log(res)
      setEmail(res.data.email)
      }).catch((err)=>{
          console.log(err.response.data)
      })
  },[])

    let imageSizeReview = async(event)=>{
let image = new Image();
 image.src = window.URL.createObjectURL(event.target.files[0])
 image.onload = async() => {
 
 if(image.width===2560||image.height===1440){
    setDisableUpload(true);
    setLoader(true)
    let file = event.target.files[0]
const formData = new FormData();
formData.append('image', file);
    axios.post(process.env.REACT_APP_BACKEND_URL+"/imageHandler/uploadEventThumb",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res=>{
      console.log(res)
      setDisableUpload(false);
      setLoader(false)
      setApproximate((prev)=>{
        return {...prev,thumb:res.data}
      })
    }).catch(err=>{
      setDisableUpload(false);
      setLoader(false)
    })
  
 }else{
  alert('upload the proper image with proper size')
 }
 }

    }
let submitAndProcess = ()=>{

  if(approximate.thumb === ""){
    alert('import image')
  }else{
 let dt = [...data,{approximate}]
 let totalTicket = 0;

 let obj = {};
 for(let i = 0;i<dt.length;i++){
  Object.assign(obj,dt[i])
 }
for(let i = 0; i<obj.tickets.length;i++){

 totalTicket = totalTicket + obj.tickets[i].ticketCount;

}
console.log(email)
let result = {
  ...obj,
  totalTicket,
  email:email
}
console.log(result)
 setLoader(true)
axios.post(process.env.REACT_APP_BACKEND_URL+'/eventSetup/organizer/event/setup_1',result).then((res)=>{
  console.log(res.data)
  setLoader(false)
  window.location.assign('/')
}).catch((err)=>{
  console.log(err)
  setLoader(false)
})

  }

}

// let uploadVideo = async(event)=>{
//   let file = event.target.files[0];
//   setDisableUpload(true)
//   setLoader(true)
//  let cid = await client.put([file],{
//   name:file.name
//  })
//  setLoader(false)
//  setDisableUpload(false)
// let url = cid+"/"+file.name;
// console.log(url)
// setApproximate((prev)=>{
// return {...prev,promoVideo:url}
// })

// }
console.log(approximate)
console.log("this is email"+email)
console.log(data)
    return(
        <>
        <div className="container-md mb-5">
 <div className={loader === true?"overlay":"overlay d-none"}>
 <div className='loading-spinner '>
<div className="spinner-border text-primary " role="status">
  <span className="sr-only"></span>
 
</div>

</div>

 </div>
            <h6 className="display-6">some more...</h6>
            <p className='text-secondary'>this setup will apply for all the tickets</p>
            

            <div className="approximate-uploader">
<div className="text-center">
<input type="file" className="btn-sm text-wrap btn-primary" accept="image/*" onChange={imageSizeReview} disabled={disableUpload}/>

<p className="form-text">upload banner image for your event,image size should be  2560*1440</p>
</div>
        </div>
        {/* video upload for event */}

{/* 

       <div className='mt-4 border p-5'>
        <h4 className='display-6 fw-lighter'>media's</h4>

       <div className='form-group mt-2'>
       <label className='form-label text-secondary'>upload promo video <CameraVideoFill /></label>
        <input type="file" className='btn-sm text-wrap btn-success d-block' accept='video/*' disabled={disableUpload} onChange={(event)=>{uploadVideo(event)}} />
       </div>

       <div className='form-group mt-2'>
       <label className='form-label text-secondary'>instagram profile url <Instagram /></label>
        <input type="text" className='form-control'/>
       </div>

       <div className='form-group mt-2'>
       <label className='form-label text-secondary'>Facebook profile url <Facebook /></label>
        <input type="text" className='form-control'/>
       </div>
       </div> */}

        <div className="options mt-5 text-center">
        <div className="form-check form-switch d-inline m-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  onChange={()=>{
if(approximate.lunch === false){
  setApproximate(prev=>{
    return {...prev,lunch:true}
  })
}else{
  setApproximate(prev=>{
    return {...prev,lunch:false}
  })
}
  }}/>
  <label className="form-check-label" for="flexSwitchCheckChecked">lunch</label>
</div>
<div className="form-check form-switch d-inline m-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={()=>{
if(approximate.mBreakFast === false){
  setApproximate(prev=>{
    return {...prev,mBreakFast:true}
  })
}else{
  setApproximate(prev=>{
    return {...prev,mBreakFast:false}
  })
}
    
  }} />
  <label className="form-check-label" for="flexSwitchCheckChecked">morning breakfast</label>
</div>
<div className="form-check form-switch d-inline m-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={()=>{
if(approximate.chaiBreak === false){
  let val = window.prompt('how many time? you need chai break?',"1");
  if(val<1){
    alert('page is going to refresh,due to wrong information');
    window.location.reload()
  }else{
    setApproximate(prev=>{
      return {...prev,chaiBreak:true,breakTimes:val}
    })
  }
}else{
  setApproximate(prev=>{
    return {...prev,chaiBreak:false,breakTimes:0}
  })
}
 
  }} />
  <label className="form-check-label" for="flexSwitchCheckChecked" >chai break</label>
</div>
<div className="form-check form-switch d-inline m-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={()=>{
if(approximate.nDinner === false){
  setApproximate(prev=>{
    return {...prev,nDinner:true}
  })
}else{
  setApproximate(prev=>{
    return {...prev,nDinner:false}
  })
}
  }} />
  <label className="form-check-label" for="flexSwitchCheckChecked">night dinner</label>
</div>
<div className="form-check form-switch d-inline m-2">

</div>
        </div>
        <button className='btn btn-success float-right mt-5' onClick={submitAndProcess}>submit and process it</button>
        </div>
        </>
    )
}
export default Approximate