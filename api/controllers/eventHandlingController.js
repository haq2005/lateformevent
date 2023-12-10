const { isValidObjectId } = require('mongoose');
let participateEvent = require("../Scehma/participatedEvent")
let eventSetup = require('../Scehma/eventSetup')

exports.verifyAttendees = async(req,res)=>{

    let email = req.body.email;
    let id = req.body.id;
    
let isId = isValidObjectId(id)
if(isId === true){
  let isHoster = await eventSetup.findOne({email:req.body.organizerEmail,_id:req.body.id});
  if(!isHoster){
res.status(400).send('you are not hoster of this event!')
  }else{
    let isThere = await participateEvent.findOne({email,id});
    if(!isThere){
       console.log(isThere)
       res.status(400).send("Attendee is not verified!")
    }else{
       await participateEvent.updateOne({email,id},{$set:{isAttend:true}});
       res.status(200).send("Attendee verified!")
   
    }
  }
}else{
res.status(400).send('something suspecious!')
}


}