var mongoose = require('mongoose')
var privateChatSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    chats:{
        type:[]
    },
    unReadMessages:{
        type:Boolean
    },
    totalUnReadMessages:{
        type:Number
    },
    createPrivateRoomFor:{
        type:[],
        required:true
    }
})

module.exports = mongoose.model('PrivateChatSchema',privateChatSchema)