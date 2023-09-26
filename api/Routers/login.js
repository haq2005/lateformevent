var express = require('express');
var Otpschema = require('../Scehma/otpSchema');
var AttendeeRegister = require('../Scehma/attendeeRegistrationSchema');
var OrganizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
var otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer')
var bcrypt = require('bcrypt')
var emailvalidator = require('email-validator');
const organizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
//setup
var router = express.Router()
var transport = nodemailer.createTransport({
    host:"server210.web-hosting.com",
    port: 465,
    secure:true,
    auth:{
        user:"support@lateform.com",
        pass:"support@lateform.com"                     //aiaiskkiszgqqyna
    }
})
//login for attendee users
router.post('/attendeeLogin',async(req,res)=>{
    let isRegister = await AttendeeRegister.findOne({email:req.body.email}) ;
    if(!isRegister){
        res.status(400).send("your account is not register!")
    }else{
        let isCorrect = await bcrypt.compare(req.body.password,isRegister.password)
        if(isCorrect){
           let token =  jwt.sign({email:req.body.email},'lateform-attendee-zetchain');
           res.header('auth',token).send(token)
        }else{
            res.status(400).send("incorrect password")
        }
    }
});

function jwtValidateUser (req,res,next){
    var token = req.header('auth');
    req.token = token;
    next()
}

router.post('/validatingAttendeeUser',jwtValidateUser,async(req,res)=>{
jwt.verify(req.token,'lateform-attendee-zetchain',async(err,data)=>{
    if(err)
        res.status(400).send('error');
    else{
        let isValidEmail = emailvalidator.validate(req.body.email);
        if(isValidEmail){

var isThere = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
if(isThere){
    var date = new Date()
    await Otpschema.deleteOne({email:req.body.email,role:"login-otp"});
    var otpNumber = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    let otpStructure = new Otpschema({
        email:req.body.email,
        otp:otpNumber,
        createAt: date,
        expiresAt: new Date(date.getTime()+(600000*2)),
        role:"login-otp"
    })
    await otpStructure.save();
var result = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
var otp = result.otp+""
var mailOption = {
    from:"support@lateform.com",
    to:req.body.email,
    sub:"otp from lateform",
    text:`Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`
}
transport.sendMail(mailOption,(err,info)=>{
    if(err){
        console.log(err)

        res.status(400).send("some thing went wrong!")
    }
    else
        res.status(200).send("email was sent")
})
}else{
    var date = new Date()
    var otpNumber = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    let otpStructure = new Otpschema({
        email:req.body.email,
        otp:otpNumber,
        createAt: date,
        expiresAt: new Date(date.getTime()+(600000*2)),
        role:'login-otp'
    })
    await otpStructure.save();
var result = await Otpschema.findOne({email:req.body.email,role:'login-otp'});
let otp = result.otp+""
var mailOption = {
    from:"support@lateform.com",
    to:req.body.email,
    sub:"otp from lateform",
    text:`Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`
}
transport.sendMail(mailOption,(err,info)=>{
    if(err)
        res.status(400).send("some thing went wrong!")
    else
        res.status(200).send("email was sent")
})
}
    
        }else{
            res.status(400).send('invalid email param')
        }
    }
})
});
router.post('/validateAttendeeOtp',async(req,res)=>{
let isEmailValid = emailvalidator.validate(req.body.email);
if(isEmailValid){
    let clientSideOtp = req.body.otp;
    let serverSideOtp = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
    let id = await AttendeeRegister.findOne({email:req.body.email})
    let date = new Date()
if(!serverSideOtp){
res.status(400).send("no otp is register")
}else{
    if(clientSideOtp === serverSideOtp.otp && date<serverSideOtp.expiresAt){
        await Otpschema.deleteOne({email:req.body.email,role:"login-otp"});
        let token = jwt.sign({otp:clientSideOtp},"otp-attendee-lateform");
        res.header('auth_2',token).send({token,id:id._id})
    }else{
        res.status(400).send("otp is not valid")
    }
}
}else{
    res.status(400).send('invalid email param')
}
})
function otpValidateAttendeeUser(req,res,next){
let token = req.header('auth_2');
req.token = token;
next()
}
router.post('/attendeeEnv',otpValidateAttendeeUser,(req,res)=>{
    jwt.verify(req.token,'otp-attendee-lateform',async(err,data)=>{
        if(err)
        res.status(400).send('login first!');
        else{
            let id = req.body.data.id;
          if(!id){
res.status(400).send('something went wrong')
          }else{
            let account = await AttendeeRegister.findOne({_id:id});
            res.status(200).send(account)
          }
        }
    })
});

// login for Organizer users












router.post('/organizerLogin',async(req,res)=>{
    let isRegister = await OrganizerRegisterSchema.findOne({email:req.body.email}) ;
    if(!isRegister){
        res.status(400).send("your account is not register!")
    }else{
        let isCorrect = await bcrypt.compare(req.body.password,isRegister.password)
        if(isCorrect){
           let token =  jwt.sign({email:req.body.email},'lateform-organizer-zetchain');
           res.header('Oauth',token).send(token)
        }else{
            res.status(400).send("incorrect password")
        }
    }
});

function OjwtValidateUser (req,res,next){
    var token = req.header('Oauth');
    req.token = token;
    next()
}

router.post('/validatingOrganizerUser',OjwtValidateUser,async(req,res)=>{
jwt.verify(req.token,'lateform-organizer-zetchain',async(err,data)=>{
    if(err)
        res.status(400).send('error');
    else{
let isValidEmail = emailvalidator.validate(req.body.email);

if(isValidEmail){
    var isThere = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
if(isThere){
    var date = new Date()
    await Otpschema.deleteOne({email:req.body.email,role:"login-otp"});
    var otpNumber = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    let otpStructure = new Otpschema({
        email:req.body.email,
        otp:otpNumber,
        createAt: date,
        expiresAt: new Date(date.getTime()+(600000*2)),
        role:"login-otp"
    })
    await otpStructure.save();
var result = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
var otp = result.otp+""
var mailOption = {
    from:"support@lateform.com",
    to:req.body.email,
    sub:"otp from lateform",
    text:`Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`
}
transport.sendMail(mailOption,(err,info)=>{
    if(err)
        res.status(400).send("some thing went wrong!")
    else
        res.status(200).send("otp was sent to your email")
})
}else{
    var date = new Date()
    var otpNumber = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    let otpStructure = new Otpschema({
        email:req.body.email,
        otp:otpNumber,
        createAt: date,
        expiresAt: new Date(date.getTime()+(600000*2)),
        role:"login-otp"
    })
    await otpStructure.save();
var result = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
let otp = result.otp+""
var mailOption = {
    from:"support@lateform.com",
    to:req.body.email,
    sub:"otp from lateform",
    text:`Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`
}
transport.sendMail(mailOption,(err,info)=>{
    if(err)
        res.status(400).send("some thing went wrong!")
    else
        res.status(200).send("otp was sent to your email :)")
})
}
}else{
    res.status(400).send('your param email is not valid')
}
    }
})
});
router.post('/validateOrganizerOtp',async(req,res)=>{
let isValidEmail = emailvalidator.validate(req.body.email);
if(isValidEmail){
    let clientSideOtp = req.body.otp;
    let serverSideOtp = await Otpschema.findOne({email:req.body.email,role:"login-otp"});
    let id = await organizerRegisterSchema.findOne({email:req.body.email})
    let date = new Date()
if(!serverSideOtp){
res.status(400).send("something went wrong!")
}else{
    if(clientSideOtp === serverSideOtp.otp && date<serverSideOtp.expiresAt){
        await Otpschema.deleteOne({email:req.body.email,role:"login-otp"});
        let token = jwt.sign({otp:clientSideOtp},"otp-organizer-lateform");
        res.header('Oauth_2',token).send({token,id:id._id})
    }else{
        res.status(400).send("something went wrong")
    }
}
}else{
    res.status(400).send('email param is not valid')
}
})
function otpValidateUser(req,res,next){
let token = req.header('Oauth_2');
req.token = token;
next()
}
router.post('/organizerEnv',otpValidateUser,(req,res)=>{
    jwt.verify(req.token,'otp-organizer-lateform',async(err,data)=>{
        if(err)
        res.status(400).send('login first!');
        else{
        let id = req.body.data.id;
if(!id){
   res.status(400).send('something went wrong') 
}else{
    let account = await OrganizerRegisterSchema.findOne({_id:id})
    res.status(200).send(account)
}
       
        }
    })
})
module.exports = router;

// "otryipifrdqeyqdc"