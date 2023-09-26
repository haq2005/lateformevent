var mongoose = require('mongoose');
var AttendeeprofileSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
   
    },
    linkedin:{
        type:String
    },
    twitter:{
        type:String
    },
    interest:{
       type:[]
    },
    aboutInterest:{
        type:String,
        required:true
    },
    aboutYou:{
work:{
    type:String
},
passion:{
    type:String
},
timeSpends:{
    type:String
},
qualification:{
    type:String
},
skills:{
    type:String
}

    }

})
module.exports = mongoose.model("attendeeProfile",AttendeeprofileSchema)