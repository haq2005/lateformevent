import QRCode from "react-qr-code";
import {  Cart,Envelope,  PersonCircle,  Ticket, TicketDetailed, } from 'react-bootstrap-icons'
 function TicketDetails(props){
let modal = props.modal
    return(
<div className="modal fade" id="ticket-modal" tabindex="-1" role="dialog" >
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">ticket details <TicketDetailed /></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div>
<iframe src={modal.loc} className="ticket-map"></iframe>
{modal.isAttend === false?<p className="text-danger text-center">Event has been not attended</p>:<p className="text-success text-center">event has been attended</p>}
<h5 className="text-center fw-light text-primary">ticket info <TicketDetailed /></h5>
<p className="text-center"><Envelope /> {modal.email}</p>
<p className="text-center"><PersonCircle /> {modal.userName}</p>
<table className="table">
<thead>
<tr>
<td className="fw-bold"><Ticket className="me-1 mb-1"/>ticket name</td>
<td className="fw-bold"><Cart className="me-1 mb-1"/>items</td>
</tr>
</thead>
{modal.ticketDetails.map((val,index)=>{
return(
<tr>
<td>{val.ticketName}</td>
<td>{val.items}</td>
</tr>
)
})}
</table>
</div>
      </div>
   <div className="text-center p-5">
   
   <QRCode value={modal.id+","+modal.email}   />
   </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    )
}
export default TicketDetails