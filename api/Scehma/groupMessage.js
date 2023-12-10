var mongoose = require('mongoose');
var groupMessage = mongoose.Schema({
group:{
    type:String,
    required:true
},
msg:[{
    from:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    groupId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    fileName:{
type:String
    }
}],

offlineToken:{
    type:[]
}
 
})

module.exports = mongoose.model('GroupMessage',groupMessage)