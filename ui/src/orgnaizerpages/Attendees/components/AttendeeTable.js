import { useRef } from "react"
import {DownloadTableExcel}from'react-export-table-to-excel'
import axios from "axios"
import { useState,useEffect } from "react"
import { FileSpreadsheet } from "react-bootstrap-icons"
function AttendeeTable(props){
    let [dataTable,setDataTable] = useState([])
    let tableRef = useRef(null)
    let [errorData,setErrorData] = useState("")
    useEffect(()=>{
axios.post(process.env.REACT_APP_BACKEND_URL+'/event/attendeeDetails',{id:props.id}).then((res)=>{
    setDataTable(res.data)
}).catch((err)=>{
    setErrorData(err.response.data)
})
    },[])
    return(
        <>
{
    errorData === ""?(
              <div className="container-md mt-5">
      <DownloadTableExcel
                    filename={props.id}
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button className="btn btn-outline-success float-right mb-5"> Export excel sheet <FileSpreadsheet className="ms-1 mb-1"/> </button>

                </DownloadTableExcel>
<table className="table" ref={tableRef}>
    <tr>
        <th>name</th>
        <th>email</th>
    </tr>

        {dataTable.map((val)=>{
            return(
            <tr>
                    <td>{val.fullName}</td>
                <td>{val.email}</td>
            </tr>
            )
        })}
    
</table>
      </div>
    ):(
        <div className="container-md">
<table className="table" ref={tableRef}>
    <tr>
        <th>name</th>
        <th>email</th>
    </tr>
    <tr>
        <h5 className="text-center mt-5">{errorData}</h5>
    </tr>
    </ table>
        </div>
    )
}
        </>
    )
}
export default AttendeeTable