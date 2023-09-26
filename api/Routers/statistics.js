var express = require('express');
const { totalTicketAnalysis, eachTickets, attendeeAttendance } = require('../controllers/statisticsController');

var router = express.Router();
router.route('/totalTicketAnalysis').post(totalTicketAnalysis)

router.route('/eachTicket').post(eachTickets)

router.route('/attendeeAttendance').post(attendeeAttendance)
module.exports = router;