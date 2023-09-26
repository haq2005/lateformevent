var express = require('express');
const { retriveMembers } = require('../controllers/groupchatController');
var router = express.Router();
router.route('/retriveMembers').post(retriveMembers)
module.exports = router