var mongoose = require('mongoose');
var organizerRegisterSchema = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    organizationName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    recoveryEmail:{
type:String,
required:true
    },
    role:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    bio:{
        type:String
    },
    stripeId:{
        type:String
    },
    FCMT:{
        type:String
    },
    communityId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    isStripeVerified:{
        type:String
    }
})
module.exports = mongoose.model('OrganizerRegisterSchema',organizerRegisterSchema)