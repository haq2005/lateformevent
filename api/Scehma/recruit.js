var mongoose = require('mongoose');
let recruit = mongoose.Schema({
    eventId:{
        type:String,
        required:true
    },
    members:{
        type:[],
        required:true
    }
})
module.exports = mongoose.model('recruit',recruit)