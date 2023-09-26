var express = require('express')
var bcrypt = require('bcrypt')
var OrganizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
const attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
const organizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
var router = express.Router();
router.post('/updateProfile',async(req,res)=>{
    console.log(req.body)
var reqId =req.body.id;
if(reqId === 2){
if(!req.body.newEmail){
    res.status(400).send('unable to update to email')
}else{
    await OrganizerRegisterSchema.updateOne({email:req.body.email},{$set:{email:req.body.newEmail}})
    res.status(200).send('your email was updated successfully');
}
}
if(reqId === 1){

    if(!req.body.newFullName){
        res.status(400).send('unable to update full name')
    }else{
        await OrganizerRegisterSchema.updateOne({email:req.body.email},{$set:{fullName:req.body.newFullName}})
        res.status(200).send('your full name was updated successfully');
    }
}
if(reqId === 3){
    if(!req.body.newOrg){
        res.status(400).send('unable to update the organization name')
    }else{
        await OrganizerRegisterSchema.updateOne({email:req.body.email},{$set:{organizationName:req.body.newOrg}})
        res.status(200).send('updated successfully');
    }
}
if(reqId === 4){
    if(!req.body.newPassword){
        res.status(400).send('give password property properly!')
    }else{
    let getPassword = await organizerRegisterSchema.findOne({email:req.body.email});
    let isSame = await bcrypt.compare(req.body.oldPassword,getPassword.password);
    if(isSame === true){
        let pass = await bcrypt.hash(req.body.newPassword,10);
        await organizerRegisterSchema.updateOne({email:req.body.email},{$set:{password:pass}})
        res.status(200).send('your password was updated')
    }else{
        res.status(400).send('old password is not same with stored data')
    }
    }
   }
   if(reqId === 5){
if(!req.body.bio){
    res.status(400).send('unable to make changes in your bio!')
}else{
    await OrganizerRegisterSchema.updateOne({email:req.body.email},{$set:{bio:req.body.bio}});
    res.status(200).send("your changes was saved")
}
   }

   if(reqId === 6){
    if(!req.body.profilePic){
        res.status(400).send('unable to change your profile!')
    }else{
        await OrganizerRegisterSchema.updateOne({email:req.body.email},{$set:{profilePic:req.body.profilePic}})
    res.status(200).send('your profile is saved')
    }
   }
})

router.post('/updateAttendeeProfile',async(req,res)=>{
if(req.body.id === 1){
 if(!req.body.newEmail){
res.status(400).send('give email input field properly')
 }else{
  await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{email:req.body.newEmail}});
  
    res.status(200).send('your email was updated')
 }
}
if(req.body.id === 2){
let fullNames= req.body.newFullName
if(fullNames.length > 3){
    await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{fullName:req.body.newFullName}})
    res.status(200).send('your name was updated')
}else{
    res.status(400).send('give fullname property properly!')
}
}
if(req.body.id === 3){
if(!req.body.newRecoveryEmail){
    res.status(400).send('give recovery email property properly!')

}else{
    await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{recoveryEmail:req.body.newRecoveryEmail}})
    res.status(200).send('your recovery email was updated')
}
}
if(req.body.id === 4 ){
if(!req.body.newPassword){
    res.status(400).send('give password property properly!')
}else{
let getPassword = await attendeeRegistrationSchema.findOne({email:req.body.email});
let isSame = await bcrypt.compare(req.body.oldPassword,getPassword.password);
if(isSame === true){
    let pass = await bcrypt.hash(req.body.newPassword,10);
    await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{password:pass}})
    res.status(200).send('your password was updated')
}else{
    res.status(400).send('old password is not same with stored data')
}
}
}
})

router.post('/notificationToken',async(req,res)=>{
    let isThere = await attendeeRegistrationSchema.findOne({email:req.body.email});
    if(!isThere){
        res.status(400).send('something went wrong')
    }else{
        await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{FCMT:req.body.token}})
        res.status(200).send('firebase token successfully stored')
    }
})

router.post('/organizerNotificationToken',async(req,res)=>{
    let isThere = await organizerRegisterSchema.findOne({email:req.body.email});
    if(!isThere){
        res.status(400).send('something went wrong')
    }else{
        await organizerRegisterSchema.updateOne({email:req.body.email},{$set:{FCMT:req.body.token}})
        res.status(200).send('firebase token successfully stored')
    }
})
module.exports = router;