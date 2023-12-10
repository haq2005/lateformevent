var mongoose = require('mongoose');
var participatedEvent = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    ticketDetails:{
        type:[],
        required:true
    }
},{strict:false})
module.exports = mongoose.model('ParticipatedEvent',participatedEvent)