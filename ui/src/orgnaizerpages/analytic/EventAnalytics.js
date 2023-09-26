import EachDonuts from './components/EachDonuts';  
import AttendancePie from './components/AttendancePie';
import Eachsale from './components/Eachsale';
import { Chart as ChartJS, ArcElement,   CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,Tooltip, Legend,BarElement } from 'chart.js';
import { ArrowLeft, BarChartFill, GraphUp, PieChart } from 'react-bootstrap-icons';
import {useEffect, useState}from'react'
import axios from 'axios'
import empty from '../../image/empty.svg'
import {ArrowUpRightSquare}from 'react-bootstrap-icons'
ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title);


function EventAnalytics(props){
let [eventArr,setEvent] = useState([]);
let [analyticsRender,setAnalyticsRender] = useState(false);
let [id,setId] = useState();
  useEffect(()=>{
    axios.post(process.env.REACT_APP_BACKEND_URL+'/event/organizerEvent',{email:props.account.email}).then((res)=>{
    let result = res.data;
    let events = result.map((val)=>{
        return val
    })
setEvent(events)
    }).catch((err)=>{
        console.log(err.response.data)
    })
},[])
console.log(analyticsRender)
console.log(id)
    return(
        <>
      {analyticsRender === false?(
          <div className='container-md'>

          
          {
         eventArr.length === 0 ?(
<div className='text-center mt-5'>


  
  <p className='text-secondary fs-5'>There is nothing to analysis. Start your event for analysis</p>
<img src={empty} style={{width:"250px", height:"250px"}}/>
</div>

         ): eventArr.map((val,index)=>{
       
              return(
                  <div className=" border-bottom p-2 mt-3 d-flex justify-content-between">
                    <h1 className='text-center'>Event Analytics</h1>
      <div><p>{val.eventName}</p></div>
      <div><p className="text-primary" type="button"  onClick={()=>{setAnalyticsRender(true); setId(val.id)}}>open<ArrowUpRightSquare className="mb-1 ms-1" /></p></div>
                  </div>
              )
          })
      }
          
          </div>
      ):(
        <>
        <ArrowLeft size={25} onClick={()=>{setAnalyticsRender(false)}}/>
        <Content id={id}/>
        </>
      )}
        </>
    )
}

export default EventAnalytics


function Content(props){
  let [attendance,setAttendance] = useState();
  let [eachTicket,setEachTicket] = useState();
  let[totalTicketAnalysis,setTotalTicketAnal] =useState()
  let [val,setVal] = useState(0)
 let getPoints = ()=>{
  let endPoints = [process.env.REACT_APP_BACKEND_URL+"/statistic/attendeeAttendance",process.env.REACT_APP_BACKEND_URL+"/statistic/eachTicket",process.env.REACT_APP_BACKEND_URL+'/statistic/totalTicketAnalysis']
axios.post(endPoints[0],{id:props.id}).then((res)=>{
  setAttendance(res.data)
  setVal((prev)=>{
    return (prev+1)
  })
}).catch((err)=>{
  console.log(err)
})

axios.post(endPoints[1],{id:props.id}).then((res)=>{
  setEachTicket(res.data)
  setVal((prev)=>{
    return (prev+1)
  })
}).catch((err)=>{
  console.log(err)
})
axios.post(endPoints[2],{id:props.id}).then((res)=>{
  setTotalTicketAnal(res.data)
  setVal((prev)=>{
    return (prev+1)
  })
}).catch((err)=>{
  console.log(err)
})
 }

  useEffect(()=>{
getPoints()
  },[])

  return(
<>
{val === 3?(
      <div className='container-md'>
     
      <hr />
      <b className='fs-2 mb-3 d-block'>Each tickets Doughnut <PieChart  className='ms-1 mb-1'/></b>
      <span className='text-secondary'>It will help you to know about the sales of each ticket</span>
  <div className='d-flex'>

      <div className='total-donhut-height mt-5 p-3 justify-content-center '>
          <EachDonuts eachTicket={eachTicket}/>
      </div>
  </div>
<hr />
  <div className='d-flex flex-column' style={{height:"500px",width:"100%", overflowY:"scroll"}}>
  <b className='fs-2 mb-3 d-block'>Analyse each ticket <BarChartFill className='ms-1 mb-1'/></b>
<span className='text-secondary'> It will help you to know about sales and balance of each ticket</span>
<Eachsale eachTicket={eachTicket} />
  </div>
      <hr />
      <h6 className='display-6 mb-3'>Attendee Attendance  <PieChart  className='ms-1 mb-1'/></h6>
      <div  className='total-donhut-height mt-5 p-3'>
      <AttendancePie attendeeAttendance={attendance}/>
      </div>

   
      </div>
):(
  <div className='text-center'>
    <div class="spinner-border text-primary" style={{width:"8rem",height:"8rem"}}role="status">
  <span class="sr-only " ></span>
</div>
<p>fetching data...</p>
  </div>
)}
</>
  )
}

// function TotalTicketPie(props){
//     const data = {
//         labels: ['balance tikets','sold tickets'],
//         datasets: [
//           {
//             label: '',
//             data: [props.totalTicket.balTicket, props.totalTicket.totalTicketSale],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               '#0D6EFD',
           
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
       
//             ],
//             borderWidth: 1,
//           },
//         ],
//       };
      
//     return (
//         <>

// <Pie data={data} />

   
//         </>
//     )
// }



// function LineTickets(){
//     const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top' ,
//           },
//           title: {
//             display: true,
//             text: 'daily sold tickets',
//           },
//         },
//       };

//       const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//       const data = {
//         labels,
//         datasets:[
//             {
//                 label: 'tickets',
//                 data:[5,1,7,4,10],
//                 backgroundColor:  '#0D6EFD',
//                 borderColor:  '#0D6EFD',
//             }
//         ]
//       }
//     return(<>
//     <Line options={options} data={data}/>
//     </>)
// }






