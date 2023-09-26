import { BellFill, ChatDotsFill } from "react-bootstrap-icons"

function AttendeeNotification(){
    return (
        <>
        <div className="mt-5 container-md" >
            <b>Your Notifications <BellFill className="ms-1 mb-1"/></b>
            <hr />
            <div className="mt-2">
<div className="d-flex mb-4 justify-content-center">
<div className="border-rounded p-4 border-bottom  d-flex">
<span ><ChatDotsFill className="me-1 mb-1" size={18}/></span>
    <span>You have a messages from Nee Kavithai Galai ! Communittee by haq:"Hello"</span>
   
</div>
</div>

<div className="d-flex mb-4  justify-content-center">
<div className="border-rounded p-4 border-bottom  d-flex">
<span ><ChatDotsFill className="me-1 mb-1" size={18}/></span>
    <span>You have a messages from Nee Kavithai Galai ! Communittee by haq:"Hello"</span>
   
</div>
</div>

<div className="d-flex mb-4  justify-content-center">
<div className="border-rounded p-4 border-bottom d-flex">
<span ><ChatDotsFill className="me-1 mb-1" size={18}/></span>
    <span>You have a messages from Nee Kavithai Galai ! Communittee by haq:"Hello"</span>
   
</div>
</div>
            </div>
        </div>
        </>
    )
}
export default AttendeeNotification