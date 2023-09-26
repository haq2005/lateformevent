import Nav from "../../../Nav"
import 'react-tooltip/dist/react-tooltip.css'
import {Clipboard, MenuApp, PersonBadge, PlusCircle, TicketDetailed, TicketFill}from'react-bootstrap-icons'
import 'bootstrap/js/dist/tooltip'

import { useState } from "react"
import {useFormik}from 'formik'
import * as yup from 'yup'
import { toast,ToastContainer } from "react-toastify"
import axios from "axios"

function Ticket({acc,setPage,setData}){
let [tickets,setTickets] = useState([])
let [submitDisable,setSubmitDisable] = useState(false)
let formik = useFormik({
  initialValues: {
    ticketName:"",
    divisionName:"",
    ticketPrice:0,
    ticketCount: 0,
    ticketSell:0
  },
  validationSchema: yup.object({
    ticketName: yup.string().required('event name is required').min(3,'ticket name should be more than 3 words'),
    divisionName:yup.string().required('division name is required').min(3,'ticket name should be more than 3 words'),
    ticketPrice:yup.number().required('price of the ticket is required').min(0,"ticket price will be more than zero if the ticket is free price will be zero!"),
    ticketCount:yup.number().required('ticket count is required').min(10,'atleast 10 should be there'),
    perHead:yup.number().required('ticket per head is required').min(1).max(5)
  }),
  onSubmit: data =>{
if(data.ticketPrice > 0 && data.ticketPrice<100){
  alert('set your ticket price properly')
}else{
  console.log(data)
  //data.account.email

if(data.ticketPrice > 0){
  axios.post(process.env.REACT_APP_BACKEND_URL+'/stripe/getApprovedVerified',{email:acc.account.email}).then((res)=>{
    setTickets((prev)=>{
      return [...prev,data]
    })
}).catch((err)=>{
   alert(err.response.data)
})
}else{
  setTickets((prev)=>{
    return [...prev,data]
  })
}

}
  }
})

let deployTicket = ()=>{
  if(tickets.length !== 0){
    setData((prev)=>{
      return[...prev,{tickets:tickets}]
    })
    setSubmitDisable(true)
    setPage(5)
  }else{
    toast.error('create your ticket first')
  }
}
console.log(tickets)

    return(
        <>
      <div className="container-fluid">
<Nav />
<div className="ticket-creator-row">
<div className="ticket-container shadow p-3">
<form onSubmit={formik.handleSubmit}>
  {/* row */}
<div className="row">
<div className="col-lg-6">
<label className="form-label fw-light">ticket name <TicketFill /></label>
  <input type="text" className="form-control" name="ticketName" value={formik.values.ticketName} onChange={formik.handleChange}/>
  {formik.errors.ticketName?<p className="text-danger">{formik.errors.ticketName}</p>:null}
</div>

<div className="col-lg-6">
<label className="form-label fw-light">division name <MenuApp /></label>
  <input type="text" className="form-control" name="divisionName" value={formik.values.divisionName} onChange={formik.handleChange}/>
  {formik.errors.divisionName?<p className="text-danger">{formik.errors.divisionName}</p>:null}
</div>
</div>
{/* row */}

{/* row */}
<div className="row">
<div className="col-12">
<label className="form-label fw-light">ticket count <Clipboard /></label>
  <input type="number" className="form-control" name="ticketCount" value={formik.values.ticketCount} onChange={formik.handleChange}/>
  {formik.errors.ticketCount?<p className="text-danger">{formik.errors.ticketCount}</p>:null}
</div>
</div>

{/* row */}
<div className="row">
<div className="col-12">
<label className="form-label fw-light">a per ticket price <Clipboard /></label>
  <input type="number" className="form-control" name="ticketPrice" value={formik.values.ticketPrice} onChange={formik.handleChange}/>
  {formik.errors.ticketPrice?<p className="text-danger">{formik.errors.ticketPrice}</p>:null}
</div>
</div>

<div className="row">
<div className="col-12">
<label className="form-label fw-light">ticket per head<PersonBadge /></label>
  <input type="number" className="form-control" name="perHead" value={formik.values.perHead} onChange={formik.handleChange}/>
  {formik.errors.perHead?<p className="text-danger">{formik.errors.perHead}</p>:null}
</div>
</div>
<button className="btn btn-success  m-1" type="submit" disabled={submitDisable}>create ticket now <PlusCircle /></button>
<button className="btn btn-primary  m-1" type="button" onClick={deployTicket} disabled={submitDisable}>deploy now  <TicketDetailed /></button>
</form>

</div>

</div>
      </div>

 
<ToastContainer />
<div className="ticket-table">
{tickets.length===0 ? null :<Ticketlist tickets={tickets}/>}
</div>
        </>
    )
}
export default Ticket

function Ticketlist(props){

  return(
    <>
    <div className="mt-5 ">
    <h2 className="display-6">ticket structure: </h2>
    <table className="table table-striped d-block" >

<thead>
<tr>
<th>ticket name</th>
<th>division name</th>
<th>ticket count</th>
<th>price</th>
</tr>
</thead>
<tbody>
{props.tickets.map((val,index)=>{
  return (




<tr>
 <td>{val.ticketName}</td>
<td>{val.divisionName}</td>
<td>{val.ticketCount}</td>
<td>{val.ticketPrice}</td>
        </tr>

   

    

  )
})}
</tbody>
    </table>
    </div>
    </>
  )
}