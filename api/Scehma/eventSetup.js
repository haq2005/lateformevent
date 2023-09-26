const mongoose = require('mongoose')

var eventSetup = mongoose.Schema({
    email:{
type:String,
required:true
    },
    eventName: {
        type:String,
        required:true
    },
    singleLineDescription: {
        type:String,
        required:true,
    },
    eventDescription : {
        type:String,
        required:true,
    },
    organizerInfo:{
        type:String,
        required:true,
    },
    typeOfEvent:{
        type:String,
        required:true
    },
    typeOfCategory:{
        type:String,
        required:true
    },
    eventLocation:{
        type:String,
        required:true
    },
    memberInfo:{
        type:[{
            name:{
                type:String,
                required:true
            },
            role:{
                type:String,
                required:true
            },
            desc:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            pic:{
                type:String
            }
        }],
        required:true
    },
    schedule:{
        type:[
         {
           id:{
                type:String,
                required:true
            },
           eventDate:{
                type:String,
                required:true
            },
            scheduleName:{
                type:String,
                required:true
            },
            time:{
                type:String,
                required:true
            }
         }
        ],
        required:true
    },
    tickets:{
        type:[{
            ticketName:{
                type:String,
                required:true
            },
            divisionName:{
                type:String,
                required:true
            },
  
          stripeProductId:{
            type:String
          },
          stripePriceId:{
            type:String
          }
          ,
            ticketCount:{
                type:Number,
                required:true
            },
            ticketPrice:{
                type:Number
            }
            ,
            ticketSell:{
                type:Number,
                required:true
            },
            perHead:{
                type:Number,
                required:true
            }
        }],
        required:true
    },
    eventHeld:{
        type:String,
        required:true
    }
    ,
    approximateOfEvent:{
        thumb:{
            type:String,
            required:true
        },
        promoVideo:{
type:String,
        },
        mBreakFast:{
            type:Boolean,
            required:true
        },
        // break:{
        //     type:Boolean,
        //     required:true
        // },
        breakTimes:{
            type:Number,
            required:true
        },
        lunch:{
type:Boolean,
required:true
        },
        nDinner:{
            type:Number,
            required:true
        }
    },
    totalTicket:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model('Eventsetup',eventSetup);


// let data = {
//     ...eventSetup_1,
//     ...eventSetup_2,
//     schedule:[{evet_id,title,start,end}],
//     tickets: [{ticketName,divisionName,validAt,expiredAt,ques,ticketCount}],
//     apporximateOfEvent:{totalTicket, morningBreakfast,lunch,break,breakTimes,nightDinner}
// }

// Thu Feb 23 2023 02:00:00 GMT+0545 (Nepal Time)
// Thu Feb 23 2023 01:00:00 GMT+0545 (Nepal Time)