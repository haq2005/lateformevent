
import { useState } from "react";
import { Building, PlusCircle, Upload } from "react-bootstrap-icons";
import Nav from "../../../Nav";
import Progress from "./Progress";
import {Web3Storage}from 'web3.storage'
let api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyMzZDMDA0ZDM1QmU3Q0FGRDM2MjZCMkUzYjIzYjY5NDQzQjM1NTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjE0MjM1NzUxMzIsIm5hbWUiOiJzaW1wbGUifQ.hgRWpUAjUIesDtxa1PzrtFIvlI8Tr37iNXNKStpXDV0'
let client = new Web3Storage({token:api})
function Setup_2({setPage,setData}){
let [commitee,setCommitee] = useState([]);
let [submitDisable,setSubmitDisable] = useState(false)
let addMember = (event)=>{
    event.preventDefault()
    setCommitee((prev)=>{
        let memberData = {
            name:"",
            role:"",
            email:"",
            desc:"",
            pic:""
        }
        return [...prev,memberData]
    })
}
let uploadImage = (index)=>{
        document.getElementById('img-uploader_'+index).click();
    
}
let photo = async(event,index)=>{
    setSubmitDisable(true)
    console.log(index)
   document.getElementsByClassName('btn-uploader')[index].classList.add("d-none");
   document.getElementsByClassName('loader')[index].classList.add('d-block')
    let files = event.target.files[0];
    
    let cid = await client.put([files],{
    name: files.name
   });
   setSubmitDisable(false)
   let url = cid+"/"+files.name;
   commitee[index][event.target.name] = url;
   document.getElementsByClassName('btn-uploader')[index].classList.remove('d-none')
   document.getElementsByClassName('loader')[index].classList.remove('d-block')

}
let changeValue = (e,index)=>{
    commitee[index][e.target.name] = e.target.value
}
let allData = (event)=>{
    event.preventDefault()
    for(let key of commitee){
        if(!key.name || !key.role || !key.email || !key.desc ){
          alert('fill the form properly')
            return
        }
        
    }
  if(commitee.length === 0){
alert('submit your form properly')
  }else{
    
    setData((prev)=>{
        return [...prev,{commitee:commitee}]
       })
       setSubmitDisable(true)
       setPage(3)
  }
}
    return(
        <>
                <Nav />
        <Progress class="progress-bar w-25 bg-success"/>
        <div className="container-md mt-5">
<h1 className="display-6">Create commitee members info <Building /></h1>
<p className="form-text">here you can give a info about speakers and other commitee members to your attendees</p>
       <div>
        <form>
{commitee.map((val,ind)=>{
    return(
<>
<div className="mt-1 me-5">
    <input type="text" className="form-control m-3 p-3" placeholder="member name" name="name"  onChange={(event)=>{changeValue(event,ind)}} />
    <input type="text" className="form-control m-3 p-3" placeholder="member role" name="role" onChange={(event)=>{changeValue(event,ind)}}/>
    <input type="email" className="form-control m-3 p-3"  placeholder="member email" name="email" onChange={(event)=>{changeValue(event,ind)}} />
    <textarea className="form-control m-3 p-3" placeholder="write something about your member..." name="desc" onChange={(event)=>{changeValue(event,ind)}} ></textarea>
    <div  className="m-2 p-3">
   
   {/* <div className="btn-uploader">
   <button className="btn btn-success " type="button" onClick={()=>{uploadImage(ind)}} id="btn-uploader">upload image <Upload /></button>
   <p className="form-text d-inline ms-1">(optional)</p>
   </div> */}
    <div className="loader">
        <button className="btn btn-dark"  type="button">uploading...</button>
    <div class="spinner-border text-dark ms-3" role="status">
  <span class="sr-only"></span>
</div>
    </div>

    <input type="file" id={'img-uploader_'+ind} accept="image/*" className="img-uploader"  name="pic" onChange={(event)=>{ photo(event,ind)}}/>
   
    </div>
</div>
<hr />
</>

    )
})}
    
   <div className="text-center mb-5">
   <button className="btn btn-primary mt-5" onClick={addMember} disabled={submitDisable}>add member <PlusCircle /></button>
    <button className="btn btn-dark mt-5 ms-5" onClick={allData} disabled={submitDisable}>Next</button>

   </div>
        </form>
       </div>
        </div>
        </>
    )
}
export default Setup_2;

