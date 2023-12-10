import { useContext } from "react"
import { MyEventContext } from "../Myevent"
import { At, BodyText, Calendar, Calendar2Check,  CardText,PersonLinesFill, ShareFill, Ticket } from "react-bootstrap-icons";

function Detailmodal(){
 let {modals} = useContext(MyEventContext)
 let [modal,setModal] = modals
 console.log(modals)
    return(
        <>
           <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">more info </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
       <p><b><Calendar2Check  className="mb-1 me-1"/>event name</b>: {modal.eventName}</p>
       <p><b><At className="mb-1 me-1"/>event ID</b>: {modal.id}</p>
       <p><b><CardText  className="mb-1 me-1"/>single line description</b>: {modal.singleLineDescription}</p>
       <p><b><BodyText className="mb-1 me-1"/>description</b>: {modal.eventDescription}</p>
       <p><b><PersonLinesFill className="mb-1 me-1"/>about organizer</b>: {modal.organizerInfo}</p>
       <p><b><Ticket className="mb-1 me-1"/>total ticket</b>: {modal.totalTicket}</p>
       <p><b><Calendar className="mb-1 me-1"/>event held on</b>: {modal.eventHeld}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
          {/* save changes button will be here */}
        </div>
      </div>
    </div>
  </div>
        </>
    )
}
export default Detailmodal