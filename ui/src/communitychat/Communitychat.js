
import { ToastContainer} from 'react-toastify'




import MessageRender from "./components/MessageRender";


function Communitychat(){



    return(
<>
<div className="container-fluid">


<div className="row community-message">
<div className="col-lg-4 d-none d-lg-block bg-light p-2">

</div>
<div className='col-lg-8 '>
<MessageRender />

</div>
</div>
</div>
 <ToastContainer position="bottom-center"/>
 </>
    )
}



export default Communitychat

