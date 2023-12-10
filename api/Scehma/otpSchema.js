var mongoose = require('mongoose');
var otpSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Otpschema',otpSchema)