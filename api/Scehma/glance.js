var mongoose = require('mongoose')
var glanceSchema = mongoose.Schema({
    //glanceId ;glanceDescription ;name->uuid ;glanceTitle;likes;dislikes;comments->array;
    glanceId:{
        type:String,//unique Id
        required:true
    },
    glanceDescription:{
        type:String,
        required:true
    },
    glanceTitle:{
        type:String,
        required:true
    },
    likes:{
        type: Number,
        required:true,
        default:0
    },
    dislikes:{
        type: Number,
        required:true,
        default:0
    },
    comments:{
        type: [],
    },   createdAt: {
        default: Date.now(),
        type: Date,
    },
})
module.exports = mongoose.model("GlanceSchema",glanceSchema)