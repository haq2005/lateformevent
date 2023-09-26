var express = require('express');
var bcrypt = require('bcrypt')
const AttendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
var OrganizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
var AttendeeProfileSchema = require('../Scehma/attendeeProfileSchema');
const community = require('../Scehma/community');
const attendeeNotification = require('../Scehma/attendeeNotification');
var router = express.Router();
router.post('/organizationRegister',async(req,res)=>{
    console.log('calling..')
    var userData = {
        organizationName: req.body.organizationName,
        email:req.body.email,
        fullName:req.body.fullName,
        password:req.body.password,
        recoveryEmail:req.body.recoveryEmail,
        role:req.body.role
    }
let isThere = await OrganizerRegisterSchema.findOne({email:req.body.email});
if(!isThere){
    if(userData.email === ""||userData.email === ""||userData.fullName === ""||userData.password===""||userData.role===""){
        res.status(400).send("fill the form properly!")
    }else{
        let pass = await bcrypt.hash(req.body.password,10)
   
        let communityData = new community({
communityName:req.body.organizationName,
createdBy:req.body.email
        })
        let comm = await communityData.save()
        let data = new OrganizerRegisterSchema({
            email:req.body.email,
            password:pass,
            organizationName: req.body.organizationName,
            fullName:req.body.fullName,
            role:req.body.role,
            recoveryEmail: req.body.recoveryEmail,
            communityId:comm._id
        });
        await data.save();
        res.status(200).send('registration successfull!')
    }
}else{
    res.status(400).send("accout was already exist!")
}
})
router.post('/attendeeRegister',async(req,res)=>{
    var userData = {

        email:req.body.email,
        fullName:req.body.fullName,
        password:req.body.password,
        recoveryEmail: req.body.recoveryEmail
    }
var isThere = await AttendeeRegistrationSchema.findOne({email:req.body.email});
if(!isThere){
    if(userData.email === ""||userData.password === ""||userData.fullName === ""||userData.recoveryEmail===""){
        res.status(400).send("fill the form properly")
     }else{
        let pass = await bcrypt.hash(req.body.password,10);
        let userData = {
            email:req.body.email,
            password: pass,
            fullName:req.body.fullName,
            recoveryEmail: req.body.recoveryEmail
     };

    var data = new AttendeeRegistrationSchema(userData);
    let profile = new AttendeeProfileSchema({
        email:req.body.email,
        mingle:0,
        minglers:[],
        aboutInterest:req.body.aboutInterest,
        interest:[],
        aboutYou:{
            work:"your Work is still not mentioned",
            passion:"your passion is still not mentioned",
            timeSpends: "spending hours for your passion is still not mentioned",
            qualification:"your qualification is still not mentioned",
            skills:"your skill is not mentioned"
        }
    })
    let attendeeNotificationSetup = new attendeeNotification({
        email:req.body.email
    })
    await 
    await data.save()
    await profile.save()
    await attendeeNotificationSetup.save()
    res.status(200).send("registration successfull")
     }
}else{
    res.status(400).send("your account was already exist!")
}
})
module.exports = router;