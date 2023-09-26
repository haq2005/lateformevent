const attendeeProfileSchema = require('../Scehma/attendeeProfileSchema');
const attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
const { default: mongoose } = require('mongoose');

exports.getAttendeeProfile = async(req,res)=>{
    let email = req.body.email;
    let profile = await attendeeProfileSchema.findOne({email:email})
    if(!profile){
res.status(400).send("something went wrong")
    }else{
        res.status(200).send(profile)
    }
}
exports.getProfile = async(req,res)=>{

    let id = req.body.id;
    let isObject = mongoose.isValidObjectId(id);
    if(isObject){
let attendee = await attendeeRegistrationSchema.findOne({_id:id});
if(!attendee){
res.status(400).send("something went wrong")
}else{
    let profile = await attendeeProfileSchema.findOne({email:attendee.email});
    res.status(200).send({
        profile,
        profilePic:attendee.profilePic,
        name:attendee.fullName
    })
}

    }else{
        res.status(400).send("something went wrong")
    }

}

exports.updateInterest = async(req,res)=>{

  let email = req.body.email;

  let isThere = await attendeeProfileSchema.findOne({email:email});
  if(!isThere){
      res.status(400).send("something went wrong!")
  }else{
      let resp = await attendeeProfileSchema.updateOne({email:email},{$set:{aboutInterest:req.body.aboutInterest}})
      res.status(200).send(resp)
  }


}

exports.updateAboutYou = async(req,res)=>{

    let email = req.body.email;
    let isThere = await attendeeProfileSchema.findOne({email:email});
    if(!isThere){
res.status(400).send("something went wrong!")
    }else{
        console.log(req.body.aboutYou)
await attendeeProfileSchema.updateOne({email:email},{$set:{aboutYou:req.body._aboutYou}})
res.status(200).send("process successfull")
    }
}

exports.updateSocialProfile = async(req,res)=>{

    let id = req.body.id
    console.log(id)
    if(id === 1){
       let profile =  await attendeeProfileSchema.updateOne({email:req.body.email},{facebook:req.body.url})
       console.log(profile) 
       res.status(200).send("process successfull")
    }
    if(id === 3){
       let profile =  await attendeeProfileSchema.updateOne({email:req.body.email},{twitter:req.body.url})
        console.log(profile)
        res.status(200).send("process successfull")
    }
    if(id === 2){
        let profile = await attendeeProfileSchema.updateOne({email:req.body.email},{linkedin:req.body.url})
       console.log(profile)
        res.status(200).send("process successfull")
    }

}