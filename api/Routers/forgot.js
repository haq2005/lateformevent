var express = require('express');
var nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
const attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
var organizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
var otpSchema = require('../Scehma/otpSchema')
var router = express.Router();
var transport = nodemailer.createTransport({
    host:"server210.web-hosting.com",
    port: 465,
    secure:true,
    auth:{
        user:"support@lateform.com",
        pass:"support@lateform.com"                     //aiaiskkiszgqqyna
    }
})
//orgainzer
router.post('/forgotPassword',async(req,res)=>{
    let email = req.body.email;
    if(email === "" || email === null){
        res.status(400).send('fill out the email field');
    }else{
        let isRegisterInOrganizer = await organizerRegisterSchema.findOne({email:email});
        let isRegisterInAttendee = await attendeeRegistrationSchema.findOne({email:email})
        let isRegister = !isRegisterInAttendee && !isRegisterInOrganizer?false:true
        console.log(isRegister)
        if(isRegister === false){
            res.status(400).send('unregistered mail!')
        }else{
            var isAlreadySent =  await otpSchema.findOne({email:email,role:'forgot-password-otp'});
            if(!isAlreadySent){

            let date = new Date()
            let otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
            let data = new otpSchema({
                email:email,
                otp:otp,
                createAt: date,
                expiresAt:new Date(date.getTime()+(600000*2)),
                role: 'forgot-password-otp'
            });
            await data.save()
            let mailOption = {
            from:"support@lateform.com",
            to: email,
            sub:"don't share this otp to anyone!",
            text:"Hi user,you are otp is here for change your password: "+otp+", Don't share this otp to anyone."
           }
           transport.sendMail(mailOption,(err,info)=>{
            if(err)
                res.send("can't able to send otp! something went wrong")
            else{
               let token =  jwt.sign({email:email},'forgot-otp-lateform')
                res.header('forgotAuth',token).send({
                    msg:"check your inbox for otp",
                    token:token
                })
            }
           })
        
            }else{
                await otpSchema.deleteOne({email:email,role:'forgot-password-otp'})
                let date = new Date()
                let otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
                let data = new otpSchema({
                    email:email,
                    otp:otp,
                    createAt: date,
                    expiresAt:new Date(date.getTime()+(600000*2)),
                    role: 'forgot-password-otp'
                });
                await data.save()
                let mailOption = {
                from:"support@lateform.com",
                to: email,
                sub:"don't share this otp to anyone!",
                text:"Hi user,you are otp is here for change your password: "+otp+", Don't share this otp to anyone."
               }
               transport.sendMail(mailOption,(err,info)=>{
                if(err)
                    res.send("can't able to send otp! something went wrong")
                else{
                    let token =  jwt.sign({email:email},'forgot-otp-lateform')
                    res.header('forgotAuth',token).send({
                        msg:"check your inbox for otp",
                        token:token
                    })
                
                }
               })
            }
        }
    }
})
function verifyForgoter(req,res,next){
let token = req.header('forgotAuth');
req.token = token
next()
}
router.post('/forgotPasswordValidation',verifyForgoter,async(req,res)=>{
jwt.verify(req.token,'forgot-otp-lateform',async(err,data)=>{
    if(err){
res.status(400).send('wrong gateway attempt is happened!')
    }else{
        if(!req.body.email  ||!req.body.newPassword|| !req.body.otp){
            res.status(400).send('fill the form properly')
        }else{

        var email = req.body.email;
        var otp  = req.body.otp;
        var newPassword = await bcrypt.hash(req.body.newPassword,10)
        var isThere = await otpSchema.findOne({email:email,otp:otp,role:'forgot-password-otp'});
        if(!isThere){
            res.status(400).send('your otp is not registerd!')
        }else{
            let currentTime = new Date()
            if(otp === isThere.otp && isThere.expiresAt>currentTime ){
               let isOrgainizer =  await organizerRegisterSchema.findOne({email:email});

if(isOrgainizer !== null){
      await organizerRegisterSchema.updateOne({email:email},{$set:{password: newPassword}});
      await otpSchema.deleteOne({email:email})
      res.status(200).send('your organizer password is changed')
}else{
  await attendeeRegistrationSchema.updateOne({email:email},{$set:{password:newPassword}})
  await otpSchema.deleteOne({email:email})
  res.status(200).send('your attendee password is changed')
}
            }else{
                res.status(400).send('invalid otp')
            }
        }
    
        }
    }
})
})

//forgot otp

router.post('/forgotOtp',async(req,res)=>{
    console.log(req.body.email)
    if(!req.body.email){
        res.status(400).send('given data is blank!')
    }
else{
       
        
let isOtpThere = await otpSchema.findOne({email:req.body.email,role:'login-otp'});
if(!isOtpThere){
    res.status(400).send('otp is not registered')
}else{
    let nowTime = new Date();
let exipreTIme = new Date(nowTime.getTime()+(600000*2))
let newOtp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
await otpSchema.updateOne({email:req.body.email,role:'login-otp'},{$set:{otp:newOtp,expiresAt:exipreTIme}})
let mailOption = {
    from: 'support@lateform.com',
    to: req.body.email,
    sub:"resend otp",
    text:"your resend otp is here: "+newOtp+", Don't share this otp to anyone"
}
transport.sendMail(mailOption,(err,data)=>{
    if(err)
        res.status(400).send("email can't send")
    else{
        res.status(200).send('check your inbox for otp')
    }
})
}

    }
})


module.exports = router