var participatedEvent = require('../Scehma/participatedEvent')
const eventSetup = require('../Scehma/eventSetup');
var attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
const event = require('../Scehma/event');
exports.getTicketDetails = async(req,res)=>{

let newObj = [];
let userEmail = req.body.email;
let userName = await attendeeRegistrationSchema.findOne({email:userEmail})
let dt = await participatedEvent.find({email:userEmail})
  let promises = dt.map(async(val)=>{
    let event = await eventSetup.findOne({_id:val.id})
    let obj = {
      userName: userName.fullName,
      email:req.body.email,
        eventName: event.eventName,
        typeOfEvent:event.typeOfEvent,
        typeOfCategory:event.typeOfCategory,
        ticketDetails: val.ticketDetails,
        isAttend:val.isAttend,
        heldOn:event.eventHeld,
        loc:event.eventLocation,
        id:val.id
    }

return obj
})
let result = await Promise.all(promises);
res.send(result)

}

exports.isParticipated = async(req,res)=>{

  console.log(req.body.id,req.body.email)
  let isThere =  await event.findOne({id:req.body.id,attendees:req.body.email});
  console.log('isthere',isThere)
  if(!isThere){
   res.status(200).send(true);
  }else{
   res.status(200).send(false)
  }
 
}
exports.getParticularTicket = async(req,res)=>{
    let ticket = await event.findOne({id:req.body.id});
    res.status(200).send(ticket.eventName)
}