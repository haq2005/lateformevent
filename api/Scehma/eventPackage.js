var mongoose = require('mongoose')
var eventPackage = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    organizerEvents:{
        type:[
             {
                eventName:{
                 type:String,
                 required:true
                },
                id:mongoose.Types.ObjectId
             }
            ],
         required:true
    }
   
})
module.exports = mongoose.model('Eventpackage',eventPackage)