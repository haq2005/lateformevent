var mongoose = require('mongoose')
var attendeeRegistrationSchema = mongoose.Schema({
    profilePic:{
type:String
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    recoveryEmail:{
        type:String,
        required:true
    },
    FCMT:{
        type:String
    }
})
module.exports = mongoose.model("AttendeeRegistrationSchema",attendeeRegistrationSchema)