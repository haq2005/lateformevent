import {useEffect, useState} from 'react'
import { CashCoin, CheckCircle, InfoCircle, PersonCircle, Wallet2, XCircle } from "react-bootstrap-icons";
import axios from 'axios'

function Payment(props){
    let [payoutStatus,setPayoutStatus] = useState(false);
    let [detailSubmitted,setDetailSubmitted] = useState(false);
    let [chargesEnabled,setChargesEnabled] = useState(false);
    let[isAccountId,setIsAccountId] = useState(false);
    let [dis,setDis] = useState(false)
    let [stripeData,setStripeData] = useState()
    let [isFetch,setIsFetch] = useState(false);
    let [stripeAccountDetail,setStripeAccountDetail] = useState()
    useEffect(()=>{
axios.post(process.env.REACT_APP_BACKEND_URL+'/stripe/isAccoutVerified',{email:props.account.email}).then((res)=>{
    console.log(res.data)
    setStripeData(res.data)
  if(res.data === "create a stripe account through lateform to enable"){
setIsAccountId(false)
  }else{
    setIsAccountId(true)
  }
    if(res.data.details_submitted === true){
        setDetailSubmitted(true)
        setIsAccountId(true)
    }

    if(res.data.charges_enabled === true){
        setChargesEnabled(true)
   
    }

    if(res.data.payouts_enabled === true){
setPayoutStatus(true)
console.log('working..')
axios.post(process.env.REACT_APP_BACKEND_URL+'/stripe/approvedVerified',{stripeId:res.data.id}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})
axios.post(process.env.REACT_APP_BACKEND_URL+'/stripe/accountDetail',{stripeId:res.data.id}).then((res)=>{
   console.log("this is stripe account detail",res.data)
    setStripeAccountDetail(res.data)
    setIsFetch(true)
}).catch((err)=>{
    console.log(err)
    setIsFetch(true)
})
    }else{
        setIsFetch(true)
    }



   
}).catch((err)=>{
    console.log(err)
})
    },[]);


    let createStripeAccount = ()=>{
        setDis(true)
        if(isAccountId === true){
axios.post(process.env.REACT_APP_BACKEND_URL+"/stripe/stipeURL",{email:props.account.email}).then(res=>{
window.location.href = res.data.url

}).catch((err)=>{
console.log(err.response.data)
setDis(false)
})
        }else{
axios.post(process.env.REACT_APP_BACKEND_URL+"/stripe/createStripeAccount",{email:props.account.email}).then((res)=>{
if(res.data === "account created"){
    axios.post(process.env.REACT_APP_BACKEND_URL+"/stripe/stipeURL",{email:props.account.email}).then(res=>{
        window.location.href = res.data.url
        }).catch((err)=>{
        console.log(err.response.data)
        setDis(false)
        })
           
}
}).catch((err)=>{
    console.log(err.response.data)
    setDis(false)
})
        }
    }
    console.log("stripe data:",stripeData)
    return(
        <>
      
{
    isFetch === false? <div>loading...</div>:(
        <div>
{payoutStatus === true?(
    <>
    <div className='container-md'>
    <b className='fs-4'>Stripe Payment </b>
    <div className='d-flex justify-content-between mt-5 flex-wrap'>
<div className='border card p-4 col-12 col-md-5 alert alert-success rounded shadow mt-5 mt-md-0'>
<b className='fw-light mt-2 text-secondary p-1'>arrived payouts amount <Wallet2 className='ms-1 mb-1'/></b>
<br />
<p className='fs-1 fw-bold d-inline mt-2 text-dark'>₹{(parseInt(stripeAccountDetail.available[0].amount)/100)}</p><span className='ms-2 '>INR</span>
<div>

</div>
</div>
<div className='border card p-4 col-12 col-md-5 alert alert-primary rounded shadow mt-5 mt-md-0'>
<b className='fw-light mt-2 text-secondary'>On the way payout amount <Wallet2 className='ms-1 mb-1'/></b>
<br />
<p className='fs-1 fw-bold d-inline text-dark'>₹{(parseInt(stripeAccountDetail.pending[0].amount)/100)}</p><span className='ms-2'>INR</span>

</div>
    </div>

<div>
    <div className='mt-5'>
        <b className='d-block'>capabilities</b>
        <span className='me-2 ms-1'><CheckCircle className='text-success'/> card payments</span>
        <span className='me-1 ms-2'><CheckCircle className='text-success'/> transfers</span>
    </div>
</div>
<div className='mt-5 mb-3 shadow p-3'>
<b className='fs-4'>Payments <CashCoin className='ms-2'/></b>
</div>
<PaymentTable email={props.account.email}/>

    </div>
    </>
):(
            <div className="container-md">
            <h6 className="fs-3 fw-bold">Payment page</h6>
            <div className="alert alert-info" role="alert">
    <InfoCircle className='ms-1  me-5'/>payments and payouts is handle by stripe payment gateway
    </div>
    {/* account status */}
    <div className='text-center  p-5'>
        {payoutStatus === false? <h6 className='fw-bolder fs-3 mb-3'><XCircle className='text-danger'/> your payouts are not enabled</h6>:<h6 className='fw-bolder fs-3 mb-3'><CheckCircle className='text-success'/>You are payouts are enabled</h6>}
        {chargesEnabled=== false? <h6 className='fw-bolder fs-3 mb-3'><XCircle className='text-danger'/> your charges are not enabled</h6>:<h6 className='fw-bolder fs-3 mb-3'><CheckCircle className='text-success'/>You are charges are enabled</h6>}
        {detailSubmitted== false? <h6 className='fw-bolder fs-3 mb-3'><XCircle className='text-danger'/> No details submitted</h6>:<h6 className='fw-bolder fs-3 mb-3'><CheckCircle className='text-success'/>Detail submitted</h6>}
    
    </div>
    
    {/* create account */}
    <div className="text-center">
    {chargesEnabled=== true? null:<button className="btn btn-outline-primary text-center" onClick={createStripeAccount} disabled={dis}>{dis===true?<span>loading...</span>:<span>create a stripe account</span>} <PersonCircle className="ms-1 mb-1"/></button>}
    {detailSubmitted === false || payoutStatus === false?<p className="mt-3">visit your stripe dashboard to enable your payouts if you not take action your charges also disable, visit: <a href="https://stripe.com" >https://stripe.com</a>. If you setup your bank verification.it will takes some while may be upto 2 or 3 business days to do verification. please wait!</p>:null}
    </div> 
    
    
     </div>
)}

        </div>
    )
}
        </>
    )
}

export default Payment;

function PaymentTable(props){
    let [data,setData] = useState()
useEffect(()=>{
axios.post(process.env.REACT_APP_BACKEND_URL+"/stripe/paymentData",{email:props.email}).then((res)=>{
    console.log(res.data)
    setData(res.data)
}).catch((err)=>{
    console.log(err)
})
},[])
console.log(props.email);
    return(
        <>
{data === undefined ? <p>loading....</p>:(        <div className='mt-5 p-5 shadow-lg mb-5 payment-table'>
<div className="text-center">
<table className="table  text-center table-hover table-responsive table-striped">
  <thead>
 <tr className='mt-5 mb-5'>
    <th>S.NO</th>
    <th>Name</th>
    <th>Email</th>
    <th>Amount</th>
    <th>Ticket name</th>
    <th>payment status</th>
 </tr>
  </thead>
  <tbody>
  
  {data.data.reverse().map((val,index)=>{
    return(
        <tr>
        <th scope="row">{index+1}</th>
        <td>{val.buyerName}</td>
        <td>{val.buyerEmail}</td>
        <td>₹ {val.total}</td>
        <td>{val.ticketName}</td>
        <td>{val.paymentStatus === "unpaid" ? <span className='badge badge-danger'>{val.paymentStatus }</span>:<span className='badge badge-success'>{val.paymentStatus }</span>}</td>
      </tr>
    )
  })}
   
  </tbody>
</table>
</div>
</div>)}
</>
    )
}