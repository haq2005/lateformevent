const eventSetup = require('../Scehma/eventSetup');
const participatedEvent = require('../Scehma/participatedEvent');

exports.totalTicketAnalysis = async(req,res)=>{

    let eventId = req.body.id;
 if(!eventId){
res.status(400).send('something went wrong')
 }else{
    let event = await eventSetup.findOne({_id:eventId});
    let totalTicketSale = event.tickets.reduce((prevVal,CurrentVal)=>{
 return  (prevVal.ticketSell+CurrentVal.ticketSell)
    })
    let totalTicket = event.totalTicket
    console.log(totalTicket)
    let obj = {
     totalTicketSale,
     balTicket: totalTicket-totalTicketSale
    }
    res.status(200).send(obj)
 }

}
exports.eachTickets = async(req,res)=>{

    let eventId = req.body.id;
  if(!eventId){
    res.status(400).send("something went wrong")
  }else{
    let event = await eventSetup.findOne({_id:eventId});
    let result =  event.tickets.map((val)=>{
     let balTicket = val.ticketCount-val.ticketSell;
      let sellTicket = val.ticketSell;
      let obj = {
          tiketName: val.divisionName,
          balTicket,
          sellTicket
      }
      return obj;
     })
     res.status(200).send(result)
  }

}
exports.attendeeAttendance = async(req,res)=>{

    console.log('triggered!')
    let eventId = req.body.id;
    if(!eventId){
      res.status(400).send("no data found")
    }else{
   let totalParticipants = (await participatedEvent.find({id:eventId})).length;
  let attendParticipants = (await participatedEvent.find({id:eventId,isAttend:true})).length
let obj = {
    totalParticipants,
    attendParticipants
}
res.status(200).send(obj)
    }

}