import { useEffect, useState } from 'react';
import { QrCodeScan } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
import QrScanner from './components/QrScanner';
function CommitteeRecruit(props){
let [Scan,setScan] = useState(false);
console.log(props.account)
    return(

        <>
        <div className='container-fluid'>

        <b className="fw-light fs-1">Qr Reader</b>
       <span className="d-block text-secondary">Scan QR and verify your Attendees to ensure a seamless event experience and maintain the security of your gathering & track attendance</span>
  <div className='d-flex justify-content-around mt-5' onClick={()=>{setScan(true)}}>
<div className='card shadow-lg cursor-pointer' data-toggle="modal" data-target="#scannerModal">
<div className='card-body p-5'>
<span><QrCodeScan size={150} className="text-secondary"/></span>

</div>
<div className='card-footer bg-primary p-3 text-white text-center border-none f'>
<span>click to scan !</span>
</div>
</div>
{/* scanner modal */}
<div className="modal fade" id="scannerModal" tabindex="-1" role="dialog"  aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Scan your Attendees</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body text-center">
    {Scan === false?null:   <QrScanner email={props.account.email}/>}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>
  </div>
  
    <ToastContainer />
        
        </div>
        </>
    )
}
export default CommitteeRecruit;
