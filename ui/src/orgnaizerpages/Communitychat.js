
import MessageRender from '../communitychat/components/MessageRender';
function Communitychat(props){


  
  


    return(
       <>
        <div className="container-fluid">
          <MessageRender data={props} organizer={true}/>
        </div>
       </>
    )
}
export default Communitychat