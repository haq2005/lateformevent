var mongoose = require('mongoose');
var AttendeeNotification = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    notifications:[{
        msg:{
            type:String
        },
        unread:{
            type:Boolean
        }
    }]
})

module.exports = mongoose.model('attendeeNotification',AttendeeNotification)