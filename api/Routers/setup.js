var express = require('express');
const { createEvent, searchEvent, getEvent, buyTicket, participatedEvent, myTickets, totalTicket } = require('../controllers/setupController');
var router = express.Router();

//setuping events or creating events
router.route('/organizer/event/setup_1').post(createEvent)
//search event
router.route('/searchEvent').post(searchEvent)
//fetching events
router.route('/getEvent').post(getEvent)
//buying ticket
router.route('/buyTicket').post(buyTicket)
//participated event
router.route('/participatedEvent').post(participatedEvent)
//fetching tickets
router.route('myTickets').get(myTickets)
//total tickets
router.route('/totalTicket').post(totalTicket)
module.exports = router;