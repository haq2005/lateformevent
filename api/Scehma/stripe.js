var mongoose = require('mongoose');
let Stripe = mongoose.Schema({
    organizerEmail:{
        type:String,
        required:true
    },
    sessionId:{
        type:[],
        required:true
    }
});
module.exports = mongoose.model('stripes',Stripe)