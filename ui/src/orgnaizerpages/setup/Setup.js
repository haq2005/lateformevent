import { useState } from "react"
import { ArrowRight } from "react-bootstrap-icons"
import Setups1 from "./components/Setup_1"
import Setups2 from './components/setup_2'
import Setups3 from './components/Schedule'
import Setups4 from './components/Ticket'
import Approximate from './components/Approximate'
import TCgenerator from "./components/TCgenerator"
function Setup(props){
    let[page,setPage] = useState(1)
  
    let [data,setData] = useState([])
  let disp = ()=>{
    if(page===1){
        return <Setups1 setPage={setPage} setData={setData}/>
    }
    else if(page === 2){
        return <Setups2 setPage={setPage} setData={setData}/>
    }
    else if(page === 3){
        return <Setups3 data={data}setPage={setPage} setData={setData}/>
    }
    else if(page===4){
        return <Setups4 acc={props} setPage={setPage} setData={setData}/>
    }
    else if(page===5){
        return <TCgenerator  setPage={setPage} setData={setData}/>
    }
    else if(page===6){
        
        return <Approximate setData={setData} data={data}/>
    }
  }
    return(
        <>
    <div className="container-fluid">
<div className="body">
{disp()}
</div>
<br />

    </div>
        </>
    )
}
export default Setup