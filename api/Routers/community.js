var express =require('express');
var router = express.Router();

const { getCommunities, getMsgCommunities, joinCommunity, leaveCommunity, isJoinCommunity } = require('../controllers/communityController');
router.route('/getCommunities').post(getCommunities);
router.route('/getMsgCommunities').post(getMsgCommunities);
router.route('/joinCommunity').post(joinCommunity)
router.route('/leaveCommunity').post(leaveCommunity)
router.route('/isJoinCommunity').post(isJoinCommunity)





module.exports = router