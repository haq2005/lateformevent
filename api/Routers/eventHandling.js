var express = require('express');
var router = express.Router();
var {verifyAttendees} = require('../controllers/eventHandlingController')

//for attendance and verify
router.route('/verifyAttendees').post(verifyAttendees)
module.exports = router;