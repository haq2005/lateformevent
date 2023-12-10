var mongoose = require("mongoose");
var community = mongoose.Schema({
 createdBy:{
type:String,
required:true
 },
    communityName:{
type:String,
required:true
    },
    messages:{
        type:[]
    },
    members:{
        type:[]
    },
    profilePic:{
        type:String
    }
})

module.exports = mongoose.model("Community",community)