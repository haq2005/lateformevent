var attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema')
var event = require('../Scehma/event')
var eventpackage = require('../Scehma/eventPackage')
let eventSetup = require('../Scehma/eventSetup')
var organizerRegisterSchema = require('../Scehma/organizerRegisterSchema')

exports.likeEvent = async(req,res)=>{

    let userEmail = req.body.email;
    
    let isThere = await attendeeRegistrationSchema.findOne({email:userEmail});
    if(!isThere){
        res.status(400).send('register a account!');
    }else{
let isDislike = await event.findOne({id:req.body.id,dislikes:userEmail})
if(!isDislike){
    let isMailThere = await event.findOne({id:req.body.id,likes:userEmail})
if(!isMailThere){
    await event.updateOne({id:req.body.id},{$push: {likes:userEmail}});
    res.status(200).send('you added like to this event')

}else{
    await event.updateOne({id:req.body.id},{$pull:{likes:userEmail}})
    res.status(200).send("you're like is removed!")
 
}
}else{
    await event.updateOne({id:req.body.id},{$pull:{dislikes:userEmail}})
    await event.updateOne({id:req.body.id},{$push: {likes:userEmail}});
    res.status(200).send('you added like to this event')
}
    }

}
exports.disLikeEvent = async(req,res)=>{

    let userEmail = req.body.email;
    
    let isThere = await attendeeRegistrationSchema.findOne({email:userEmail});
    if(!isThere){
        res.status(400).send('register a account!');
    }else{
let isLike = await event.findOne({id:req.body.id,likes:userEmail})
if(!isLike){
    let isMailThere = await event.findOne({id:req.body.id,dislikes:userEmail})
if(!isMailThere){
    await event.updateOne({id:req.body.id},{$push: {dislikes:userEmail}});
    res.status(200).send('you added dislike to this event')

}else{
    await event.updateOne({id:req.body.id},{$pull:{dislikes:userEmail}})
    res.status(200).send("you're dislike is removed!")
 
}
}else{
    await event.updateOne({id:req.body.id},{$pull:{likes:userEmail}})
    await event.updateOne({id:req.body.id},{$push: {dislikes:userEmail}});
    res.status(200).send('you added dislike to this event!')

}
    }


}
exports.isEngaged = async(req,res)=>{

    console.log('getting..')
    let isLike = await event.findOne({likes:req.body.email,id:req.body.id});
    let isDislike = await event.findOne({dislikes:req.body.email,id:req.body.id});
    if(isLike !== null){
        res.status(200).send("liked")
    }
    if(isDislike !== null){
        res.status(200).send('disliked')
    }
    if(isLike === null && isDislike === null){
        res.status(200).send('not engaged')
    }


}

exports.totalLikes = async(req,res)=>{

    console.log(req.body.id)
    let data = await event.findOne({id:req.body.id});
  if(!data){
res.status(400).send('no event')
  }else{
    let dislikes = data.dislikes
    let totalDislike = dislikes.length;
    let likes = data.likes;
    let totalLikes = likes.length
    let obj = {
      likes:totalLikes,
      dislikes:totalDislike
    }
      res.status(200).send(obj)
  }

}

exports.organizerEvent = async(req,res)=>{

    let Resultobj = [];
   let result_1 = await eventpackage.findOne({email:req.body.email});
if(result_1){
    let promise = result_1.organizerEvents.map(async(val)=>{
        let result_2 = await eventSetup.findOne({_id:val.id})
        let obj = {
            eventName:result_2.eventName,
            id:result_2._id, 
            singleLineDescription:result_2.singleLineDescription,
            eventDescription:result_2.eventDescription,
            organizerInfo:result_2.organizerInfo,
            eventHeld:result_2.eventHeld,
            totalTicket:result_2.totalTicket
         }
        return obj
       })
     
       let result = await Promise.all(promise)
     res.status(200).send(result)
}else{
    res.status(400).send("no event")

}


}

exports.attendeeDetails = async(req,res)=>{

    let attendees = await event.findOne({id:req.body.id});
    if(attendees.attendees.length > 0){
   let promise =  attendees.attendees.map(async(val)=>{
        let attendeeDetails = await attendeeRegistrationSchema.findOne({email:val});

        return {
            fullName: attendeeDetails.fullName,
            email: attendeeDetails.email
        }
    })

    let result = await Promise.all(promise)
    console.log(result)
      res.send(result)
}else{
res.status(400).send("there is no attendees yet!")
}
 

}

exports.getEvents = async(req,res)=>{
    let events = await eventSetup.find();
    if(!event){
        res.status(400).send('there is no event is held now')
    }else{
        res.status(200).send(events)
    }
}

exports.getOrganizer = async(req,res)=>{
    let dt = await organizerRegisterSchema.findOne({email:req.body.email});
    let obj = {
        name:dt.fullName,
        organizationName:dt.organizationName,
        profilePic:dt.profilePic,
        bio:dt.bio
    }
    res.status(200).send(obj)
}