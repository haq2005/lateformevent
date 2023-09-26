import { useState } from "react"

function TCgenerator({setPage,setData}){
  
    let [val,setVal] = useState("");
    let [list,setList] = useState([]);
    let [dis,setDis] = useState(false)
    let generateTerm = ()=>{
      console.log(val)
      setList((prev)=>{
        return [...prev,val]
      })
    }
    let confirm = ()=>{
        setDis(true)
        console.log('working')
        let obj = {
            termAndCondition: list
        }
        setData((prev)=>{
            return [...prev,obj]
           })
           setPage(6)
    }
    return(
        <>
        <div className="container-md">
<h5 className="mt-5">create your event regulations here!</h5>
<div className="d-flex p-5">
<input type="text" className="form-control" onChange={(e)=>{setVal(e.target.value)}}/>
<button className="btn btn-primary ms-2" onClick={generateTerm} disabled={val.length < 50?true:false}>create term</button>
</div>

{/* list */}
<div className="d-flex justify-content-center border-top">
<ul className="mt-3">
    {list.map((val)=>{
        return <li className="mt-3">{val}</li>
    })}
</ul>
</div>
{dis === true ? null:<button className="btn btn-primary mt-1 float-right" onClick={confirm} disabled={list.length < 3?true:false}>confirm your rules and regulations</button>
}
        </div>
        </>
    )
}
export default TCgenerator