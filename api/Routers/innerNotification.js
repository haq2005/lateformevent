var express = require('express');
const attendeeNotification = require('../Scehma/attendeeNotification');
var router = express.Router();

router.get("/sendInnerNotification",async(req,res)=>{

    let user = await attendeeNotification.find({email:{$in:emails}})
    res.status(200).send(user)
})
module.exports = router