var express = require('express');
const { getAttendeeProfile, getProfile, updateInterest, updateAboutYou, updateSocialProfile } = require('../controllers/attendeeProfileController');

var router = express.Router();
//getting attendee Profile by email
router.route('/getAttendeeProfile').post(getAttendeeProfile)
//getting attendee Profile by id
router.route('/getProfile').post(getProfile)
//updating attendee intrest
router.route('/updateInterest').post(updateInterest)
//updating attendee AbouYou feature
router.route('/updateAboutYou').post(updateAboutYou)
//update attendee social media's url
router.route('/updateSocialUrl').post(updateSocialProfile)

// router.post('/updateMingle',async(req,res)=>{
//     let email = req.body.email
//    if(!email){
// res.status(400).send("something went wrong!...")
//    }else{

//     let isThere = await attendeeProfileSchema.findOne({email:email,minglers:req.body.mingler});

// if(!isThere){
//     await attendeeProfileSchema.updateOne({email:email},{$inc:{mingle:1}});
//     await attendeeProfileSchema.updateOne({email:email},{$push:{minglers:req.body.mingler}});
//     res.status(200).send("now you are mingled")
// }else{
//     await attendeeProfileSchema.updateOne({email:email},{$inc:{mingle:-1}});
//     await attendeeProfileSchema.updateOne({email:email},{$pull:{minglers:req.body.mingler}});
//     res.status(200).send("now you are un-mingled!")
// }

//    }
// })



module.exports = router