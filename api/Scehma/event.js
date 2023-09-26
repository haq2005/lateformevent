var mongoose = require('mongoose');
var event = mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    id:{
        type:mongoose.Schema.Types.ObjectId
    },
    attendees:{
        type:[],
        required:true
    },
    likes:{
        type:[]
    },
    dislikes:{
        type:[]
    }
})
module.exports = mongoose.model("Event",event);
