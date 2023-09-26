var express = require('express')
const { getTicketDetails, isParticipated, getParticularTicket } = require('../controllers/ticketsController')
var router = express.Router()
router.route('/getTicketDetails').post(getTicketDetails)
router.route('/isParticipated').post(isParticipated)
router.route("/getParticularTicket").post(getParticularTicket)

module.exports = router;