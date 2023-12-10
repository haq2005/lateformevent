var express = require('express');
var router = express.Router();
var { createPrivateRoom, retrivePrivateRoom } = require('../controllers/privateChatController')
router.route('/createPrivateRoom').post(createPrivateRoom)
router.route('/retrivePrivateRoom').post(retrivePrivateRoom)



module.exports = router