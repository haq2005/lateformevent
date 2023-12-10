import { useContext } from 'react';
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { MyEventContext } from '../Myevent';

function Sharemodal(){
    let {modals} = useContext(MyEventContext)
    let [modal,setModal] = modals
    return(
        <>
           <div className="modal fade" id="shareEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Share Your Event!</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body d-flex justify-content-between">
        <div>
  <WhatsappShareButton url={'http://192.168.43.178:3000/#/event-invitation?id='+modal.id}>
    <WhatsappIcon size={50} borderRadius="100%"/>
  </WhatsappShareButton>
  </div>
  
  <div>
  <FacebookMessengerShareButton  url={'https://lateform.com/#/event-invitation?id='+modal.id} >
    <FacebookIcon size={50} borderRadius="100%"/>
  </FacebookMessengerShareButton>
  </div>
  
  <div>
  <TwitterShareButton url={'https://lateform.com/#/event-invitation?id='+modal.id} >
    <TwitterIcon size={50} borderRadius="100%"/>
  </TwitterShareButton>
  </div>
  
  <div>
  <TelegramShareButton url={'https://lateform.com/#/event-invitation?id='+modal.id} >
    <TelegramIcon size={50} borderRadius="100%"/>
  </TelegramShareButton>
  </div>
  
  <div>
  
  <FacebookMessengerShareButton url={'https://lateform.com/#/event-invitation?id='+modal.id}>
    <FacebookMessengerIcon size={50} borderRadius="100%"/>
  </FacebookMessengerShareButton>
  </div>
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
export default Sharemodal