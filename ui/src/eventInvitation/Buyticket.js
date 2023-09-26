import Nav from '../Nav';
import {Cart, Cart3, DashCircle, PlusCircle}from 'react-bootstrap-icons'

import { useEffect, useState } from 'react';
import axios from 'axios';
function Buyticket(){
    let [dt,setdt] = useState("");
    let [cart,setCart] = useState([]);
    let [loader,setLoader] = useState(false);
    let [timeOver,setTimeOver] = useState(false)
    let [data,setData] = useState()
    useEffect(()=>{
        let href = window.location.href;
       // let link = href.replace('#/','');
        
        let param = new URL(href)
        let id = param.searchParams.get('id')
        axios.post(process.env.REACT_APP_BACKEND_URL+'/eventSetup/getEvent',{id:id}).then((res)=>{
            console.log(res.data[0])
          setdt(res.data[0])
          let d1 = new Date(res.data[0].eventHeld)
          let d2 = new Date().getTime()
          if( d1 > d2){
            setTimeOver(false)
          }else{
            setTimeOver(true)
          }
        }).catch((err)=>{
            if(err.response === undefined){alert(err)}else{alert(err.response.data)}
        })
    },[]);
    useEffect(()=>{
       
          
if(cart.length !==0){
cart.map((val,index)=>{
    if(val.items === 0){
        let newCart = cart.filter((val)=>{
            return val.items !== 0;
        });
        console.log(newCart)
        setCart(newCart)
    }
})
}
         
    },[cart])
    
 useEffect(()=>{
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id: localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
        setData(res.data)
        console.log(res.data)
       }).catch((err)=>{
           console.log(err.response.data)
       })
 },[])

    let addCart = (eventName,ind)=>{

let cartFilter = cart.find((val)=>{
   return val.index === ind
})
if(!cartFilter){
  if(cart.length ===0){
    setCart((prev)=>{
        return [...prev,{
            index:ind,
            eventName,
            items: 1,
            price:dt.tickets[ind].ticketPrice,
            stripeProductId:dt.tickets[ind].stripeProductId,
            stripePriceId:dt.tickets[ind].stripePriceId
          
        }]
    })
  }else{
    alert('one should buy one ticket')
  }
}else{
  cart.map((val,index)=>{
        let isSame =  val.index === ind;
        if(isSame === true){
let newArr = [...cart];
console.log(newArr)
newArr.map((val,index)=>{
    let isSame =  val.index === ind;
    if(isSame === true){
    
        
        if(cart[index].items < dt.tickets[ind].perHead){
            
            cart[index].items += 1; 
            cart[index].price += dt.tickets[ind].ticketPrice; 
            return true
        }else{
            return false
        }
        
    }else{
        return false
    }
})
setCart(newArr)
        }else{
        
        }
    })
   
}
      
    }

    let minusCart = (ind)=>{
      


let cartFilter = cart.find((val)=>{
   return val.index === ind
})
if(!cartFilter){
alert('cart is empty')
}else{
  cart.map((val,index)=>{
        let isSame =  val.index === ind;
        if(isSame === true){
let newArr = [...cart];
newArr.map((val,index)=>{
    let isSame =  val.index === ind;
    if(isSame === true){
       if( cart[index].items >=1 ){
        cart[index].items -= 1; 
        cart[index].price -= dt.tickets[ind].ticketPrice; 

       }else{
        alert('this event ticket count is zero')
       }
        return true
    }else{
        return false
    }
})
setCart(newArr)
        }else{
        
        }
    })
   
}
      
    }
    //checkout
let checkout = ()=>{
    setLoader(true)
    axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeEnv',{data:{id:localStorage.getItem('id')}},{headers:{auth_2:localStorage.getItem('auth_2')}}).then((res)=>{
        let email = res.data.email;
  let obj_1 = {
    email,
    name:res.data.fullName,
    isAttend:false,
    ticketDetails: cart.map((val,index)=>{
        console.log(val)
     return{
      ticketName:val.eventName,
        items:val.items,
        ticketPrice:val.price,
        stripePriceId:val.stripePriceId,
        stripeProductId:val.stripeProductId
     }
      })
  }
if(dt.approximateOfEvent.lunch === true){
    obj_1.isCompletedLunch = false
}
if(dt.approximateOfEvent.breakTimes>0){
    obj_1.balanceBreak = dt.approximateOfEvent.breakTimes
}
if(dt.approximateOfEvent.mBreakFast === true){
    obj_1.isCompletedmBreakFast = false
}
if(dt.approximateOfEvent.nDinner !== 0){
    dt.approximateOfEvent.nDinner =false
}

  let href = window.location.href;
  //let link = href.replace('#/','');
  
  let param = new URL(href)
  let id = param.searchParams.get('id')
  let obj_2 = {
email,
id
  }
  let data = {
    ...obj_1,
    ...obj_2,
    organizerMail:dt.email
  }
  console.log("this is from data",data)
  console.log(data.ticketDetails[0].ticketPrice)
if(data.ticketDetails[0].ticketPrice > 0){
    axios.post(process.env.REACT_APP_BACKEND_URL+'/tickets/isParticipated',{email:data.email,id:dt._id}).then((res)=>{
      
        if(res.data == true){
         
          console.log(data.ticketDetails[0]);
          let obj = {
            email:dt.email,
            ...data
          }
      
          axios.post(process.env.REACT_APP_BACKEND_URL+'/stripe/checkoutTicket',obj).then(res=>{
        window.location.href = res.data
          }).catch((err)=>{
            setLoader(false)
            if(err.response === undefined){alert(err)}else{alert(err.response.data)}
          })
        }else{
            setLoader(false)
            alert('you already booked the tickets')
        }
    })
}else{
    axios.post(process.env.REACT_APP_BACKEND_URL+'/tickets/isParticipated',{email:data.email,id:dt._id}).then((res)=>{
        if(res.data == true){
            axios.post(process.env.REACT_APP_BACKEND_URL+"/eventSetup/buyTicket",data).then((res)=>{
                console.log(res.data.msg)
                setLoader(false)
                alert('ticket is booked successfully')
            }).catch((err)=>{
                setLoader(false)
                if(err.response === undefined){alert(err)}else{alert(err.response.data)}
            })
        }else{
            setLoader(false)
            alert('you already booked the tickets')
        }
    }).catch((err)=>{
        setLoader(false)
        if(err.response === undefined){alert(err)}else{alert(err.response.data)}
    })

}



    }).catch((err)=>{
        if(err.response === undefined){alert(err)}else{alert(err.response.data)}
        setLoader(false)
    })
}
    return(
        <>
  {timeOver === false?(
        <div className='container-md '>
        <div className={loader === true?"overlay":"overlay d-none"}>
   <div className='loading-spinner '>
  <div className="spinner-border text-primary " role="status">
    <span className="sr-only"></span>
   
  </div>
  
  </div>
  
   </div>
  <Nav />
  
  
  
  
  <div className="float-right p-2 cart d-block" data-toggle="modal" data-target="#exampleModalLong"><Cart size={50} /><span className='badge badge-danger'>{cart.length===0?null:cart.length}</span></div>
  {/* modal */}
  <div className={loader === false?"modal fade":"modal fade d-none"} id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">your cart <Cart3 /></h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <div className='p-5'>
  {cart.length === 0? <p className='text-center'>cart is empty</p>:
  <table className='table'>
      <tr>
          <th className='m-1'>ticket</th>
          <th className='m-1'>items</th>
          <th className='-1'>price</th>
      </tr>
      {
          cart.map((val,index)=>{
              return(
                  <tr>
                      <td>{val.eventName}</td>
                      <td>{val.items}</td>
                      <td>₹ {val.price}</td>
                  </tr>
              )
              })
      }
  </table>
  }
  {cart.length === 0?null:<button className='btn btn-success btn-full m-2' onClick={checkout}>checkout</button>
  }
  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  {/* modal end */}
  <br />
  <div className='d-flex justify-content-center mt-5'>
  <div className={dt===""?"col-lg-6 text-center":"col-lg-6"}>
  {
      dt === ""?<div className="spinner-border text-primary " style={{width: "8rem",height:"8rem"}}role="status">
      <span className="sr-only">Loading...</span>
    </div>:(
          <div>
              {dt.tickets.map((val,index)=>{
                  let divisionName = val.divisionName;
                  let formIndex = index;
             
                 return(
                  <div className='border mb-5 p-3' key={index}>
                      <p className='fs-4'>{divisionName} </p>
                      <p>price: ₹{val.ticketPrice}</p>
                      {val.ticketSell < val.ticketCount-1?<span className='badge badge-success'>available</span>:<span className='badge badge-secondary'>housefull</span>}
                      <p className='text-secondary'>event will held on: {dt.eventHeld}</p>
                 
                     <div className='text-center'>
                     <button className='btn btn-white' onClick={()=>{addCart(val.divisionName,index)}} disabled={val.ticketSell < val.ticketCount-1 ?false:true}><PlusCircle size={35}/></button>
                 {cart.length ===0?null: cart.map((val,index)=>{
                  if(val.index === formIndex){
                     
                      return val.items
                  }else{
                  
                    
                  }
                 })}
                  <button className='btn btn-white' onClick={()=>{minusCart(index)}}><DashCircle size={35}/></button>
  
                      </div>
                  </div>
                 )
              })}
          </div>
      )
  }
  </div>
  </div>
        </div>
  ):<h5>sorry,booking time is over :(</h5>}
        </>
    )
}
export default Buyticket;