import Progress from "./Progress";
import {useFormik}from'formik'
import * as yup from 'yup'
import {useState } from "react";
import { Geo, GeoAlt, InfoCircle } from "react-bootstrap-icons";
function Setup({setPage,setData}){
    let [loc,setLoc] = useState(null)
    let [locVal,setLocVal] = useState(null)
    let [submitDisable,setSubmitDisable] = useState(false)
//form validator
let formik = useFormik({
    initialValues:{
        eventName:"",
        singleLineDesc:"",
        eventDesc:"",
        organizerInfo:"",
        typeOfEvent:"",
        typeOfCategory:"",
        eventHeld:""
    },
    validationSchema : yup.object({
        eventName: yup.string().required("event name is required").min(3,"event name should be more than 3 letters"),
        singleLineDesc: yup.string().required("single line description is required").min(20,"it too short").max(100,'it too big'),
        eventDesc: yup.string().required('description is required').min(200,'description is too short!'),
        organizerInfo: yup.string().required('this field is required').min(50,'info is too short').max(80,'info is too big'),
        typeOfEvent: yup.string().required('type of event is required'),
        typeOfCategory : yup.string().required('category of the event is required'),
        eventHeld:yup.date().required('event held date is must').min(new Date(),"event helding date don't be a today")
    }),
    onSubmit: (data)=>{
    console.log('working..')
if(!loc){
alert('fill the form properly')
}else{
    let dt = {
        ...data,
        eventLocation : loc
    }
   
   setData((prev)=>{
    return [...prev,dt]
   })

setSubmitDisable(true)
console.log(dt)
setPage(2)
}
    }
})

    //location getter
function getLocation(event){
event.preventDefault()
    if(locVal === null || locVal === ""){
        alert('fill it properly');
    }else{
        setLoc('https://www.google.com/maps/embed/v1/place?key=AIzaSyDg7YFv0E0NzjFsq8037V80weDvjcRXa9o&q='+locVal)       
        console.log(locVal)
    }
}

    return(
        <>
   
        <Progress class="progress-bar bg-success"/>
        <div className="container-md mt-2">
<div className="row">
<div className="col-12">
{/* form */}
<form className="form m-1" onSubmit={formik.handleSubmit}>
{/* descrbing about event */}
<h1 className="display-6">Basic info <InfoCircle  className="p-1"/></h1>
<p className="fw-light">Name your event and tell to your attendees about event!</p>
{/* set one in des */}

<div className="form-group m-1">
<label className="form-label">Event Name</label>
<input text="text" className="form-control" name="eventName" value={formik.values.eventName} onChange={formik.handleChange}/>
{formik.errors.eventName? <p className="text-danger">{formik.errors.eventName}</p>:null}
</div>

<div className="form-group m-1">
<label className="form-label">single line description</label>
<input text="text" className="form-control" name="singleLineDesc" value={formik.values.singleLineDesc} onChange={formik.handleChange}/>
{formik.errors.singleLineDesc? <p className="text-danger">{formik.errors.singleLineDesc}</p>:null}
</div>

<div className="form-group m-1">
<label className="form-label">Event description</label>
<textarea className="form-control" placeholder="write description..." name="eventDesc"  value={formik.values.eventDesc} onChange={formik.handleChange}>
</textarea>
{formik.errors.eventDesc? <p className="text-danger">{formik.errors.eventDesc}</p>:null}
</div>

<div className="form-group m-1">
<label className="form-label">organizer info</label>
<input type="text" className="form-control" name="organizerInfo" value={formik.values.organizerInfo} onChange={formik.handleChange}/>
{formik.errors.organizerInfo? <p className="text-danger">{formik.errors.organizerInfo}</p>:null}
</div>

<div className="form-group m-1">
    <label className="form-label">event on</label>
    <input type="date"  className="form-control" name="eventHeld" value={formik.values.eventHeld} onChange={formik.handleChange}/>
    {formik.errors.eventHeld? <p className="text-danger">{formik.errors.eventHeld}</p>:null}

</div>

<div className="row m-1">
<div className="form-group col-6">
<label className="form-label">type of event</label>
<select className="form-select" name="typeOfEvent" value={formik.values.typeOfEvent} onChange={formik.handleChange}>
   <option  value={null}></option>
    <option value="concert or performance">concert or performance</option>
    <option value="attraction">attraction</option>
    <option value="workshop">workshop</option>
    <option value="festival">festival</option>
    <option value="competion">competition</option>
    <option value="networking">networking</option>
    <option value="meeting">meeting</option>
    <option value="seminar">seminar</option>
    <option value="rally">rally</option>
    <option value="other">other</option>
</select>
{formik.errors.typeOfEvent? <p className="text-danger">{formik.errors.typeOfEvent}</p>:null}

</div>
<div className="form-group col-6">
<label className="form-label">type of category</label>
<select className="form-select" name="typeOfCategory" value={formik.values.typeOfCategory} onChange={formik.handleChange}>
<option value={null}></option>
    <option value="education">education</option>
    <option value="business & professional">business & professional</option>
    <option value="entertainment">entertainment</option>
    <option value="fashion">fashion</option>
    <option value="government & politics">government & politics</option>
    <option className="other">other</option>
</select>
{formik.errors.typeOfCategory? <p className="text-danger">{formik.errors.typeOfCategory}</p>:null}

</div>

</div>
{/* location embedding */}
<h1 className="display-6">Location <Geo /></h1>
<p className="fw-light">frame your event location to your attendees</p>
<div className="d-flex">

<div>
    <input type="text" placeholder="type location" className="form-control" name="eventLocation" onChange={(e=> setLocVal(e.target.value))}/>
</div>
<div>
<button className="btn btn-outline-primary btn-full ms-1" onClick={getLocation}>Locate now <GeoAlt /></button>
</div>
</div>

{loc===null?null: <Frame data={loc}/>}
{/* <div className="mt-1">
<h1 className="display-6 mt-1">Date & Time <Clock /></h1>
<p className="fw-light">Set your time and date to let your attendees know when your event starts and ends</p>
<div className="row m-1">
<div className="col-6 p-1">
<label className="form-label">start date: </label> <input type="date" className="form-control" />
</div>
<div className="col-6 p-1">
 <label className="form-label">end date: </label> <input type="date" className="form-control"/>
</div>
</div>
<div className="row m-1">
<div className="col-6 p-1">
<label className="form-label">start time: </label><input type="time" className="form-control" />
</div>
<div className="col-6 p-1">
<label className="form-label">end time: </label> <input type="time" className="form-control"/>
</div>
</div>
</div> */}
<button className="btn btn-dark btn-full mt-3 mb-3 " type="submit" disabled={submitDisable}>process it </button>
</form>

{/* iframe */}


{/* date setup */}

</div>

</div>
        </div>
        </>
    )
}
export default Setup
function Frame(props){
    return(
        <>
        <iframe frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="gmap" src = {props.data} className="map"></iframe>
        </>
    )
}



// AIzaSyDg7YFv0E0NzjFsq8037V80weDvjcRXa9o