import { useState } from 'react'
import { InfoCircle } from 'react-bootstrap-icons'
import Speaker from '../image/home.webp'
import Clogin from './Clogin'
import Glogin from './Glogin'
function Home(){
    let [isHoster,setHoster] = useState(false)
    return(
<div className='container-fluid'>
<div className='row'>
    {/* img */}
<div className='col-lg-4 d-none d-lg-block'>
<div className='home-div'>
<img src={Speaker} className="home-img"/>
</div>
</div>
{/* form */}
<div className='col-lg-8 col-12 p-5'>

<div className='mt-5'>
<p className='fs-4 text-secondary text-wrap'><b className='text-primary fs-2'>Lateform.</b>- Connecting you to unforgettable experiences.</p>
<div>
<ul className="nav nav-tabs">
    
  <li className="nav-item">
<span className={isHoster === false?"nav-link active":"nav-link"} type="button" onClick={()=>{setHoster(false)}}>Attendee</span>
  </li>
  <li className="nav-item">
<span  className={isHoster === false?"nav-link":"nav-link active"} type="button" onClick={()=>{setHoster(true)}}>Hoster</span>
  </li>

</ul>
{/* tab form */}
<div>
{isHoster === false?(
<Glogin />
):(
    <Clogin />
)}
</div>
</div>
</div>

</div>
</div>

</div>
    )
}

export default Home