var express = require('express');
const { likeEvent, disLikeEvent, isEngaged, totalLikes, organizerEvent, attendeeDetails, getEvents, getOrganizer } = require('../controllers/eventsController');


var router = express.Router();

router.route('/likeEvent').post(likeEvent);
router.route('/dislikeEvent').post(disLikeEvent);
router.route('/isEngaged').post(isEngaged);
router.route('/totalLikes').post(totalLikes)
router.route('/organizerEvent').post(organizerEvent)
router.route('/attendeeDetails').post(attendeeDetails)
router.route('/getEvents').get(getEvents)
router.route('/getOrganizer').post(getOrganizer)
   
module.exports = router;