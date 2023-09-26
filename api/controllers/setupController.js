var EventSetup = require('../Scehma/eventSetup')
var Eventpackage = require('../Scehma/eventPackage')
var event = require('../Scehma/event');
var participatedEvent = require('../Scehma/participatedEvent')
const { default: mongoose } = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_SEC_KEY_LIVE_MODE)

exports.createEvent = async(req,res)=>{

    let data = req.body
    let status = []
    console.log(req.body)
    // member info checker
    data.commitee.forEach((val,index)=>{
        if(!val.name || !val.role || !val.email || !val.desc){
            status.push(false)
             
            }else{
             status.push(true)
            }
       });
       //schedule checker
       data.schedule.forEach((val,index)=>{
        if(!val.id || !val.eventDate || !val.scheduleName || !val.time){
            status.push(false)
        }else{
            status.push(true)
        }
       })
    //    eventTicket

    data.tickets.forEach((val,index)=>{
        if(!val.ticketName || !val.divisionName  || !val.ticketCount){
            status.push(false)
        }else{
            status.push(true)
        }
    })
    //state
    let state = status.every((val,index)=>{
        return val === true;
    })
    console.log(state)
if(!data.email || !data.eventName || !data.singleLineDesc || !data.eventDesc || !data.organizerInfo|| state === false|| !data.approximate.thumb){
    res.status(400).send('setuping your ticket went wrong!')
 }else{
 let url =  new URL("http://localhost:8001/imageHandler/getImage/"+data.approximate.thumb)
 console.log(url)
let tickets = await Promise.all(
    data.tickets.map(async(val)=>{
        console.log('coming..')
        if(val.ticketPrice >= 100){
        let productId =  await stripe.products.create({
             name: val.divisionName,
             description: val.divisionName+"ticket is by the "+val.ticketName,
             images:[url]
         })  
        var priceId =  await stripe.prices.create({
            product:productId.id,
            unit_amount:val.ticketPrice*100,
            currency:"INR"
        });
         val.stripeProductId = productId.id
         val.stripePriceId = priceId.id
        }
       return val;
     })
)
console.log(tickets)


    let setup_1 = new EventSetup({
        email:data.email,
        eventName: data.eventName,
        singleLineDescription:data.singleLineDesc,
        eventDescription:data.eventDesc,
        eventHeld:data.eventHeld,
        organizerInfo:data.organizerInfo,
        eventLocation:data.eventLocation,
        typeOfCategory:data.typeOfCategory,
        typeOfEvent:data.typeOfEvent,
        memberInfo: data.commitee,
        schedule:data.schedule,
        tickets:tickets,
        approximateOfEvent:data.approximate,
        totalTicket:data.totalTicket
    })
    let saved = await setup_1.save()

let isEventPackageThere = await Eventpackage.findOne({email:data.email}) 
if(!isEventPackageThere){
    let organizerEventData = new Eventpackage({
        email: req.body.email,
        organizerEvents: [{
     
            eventName:data.eventName,
            id:saved._id
         
        }]
       })
       await organizerEventData.save()
}else{
    await Eventpackage.updateOne({email:data.email},{$push:{organizerEvents:{eventName:data.eventName,id:saved.id}}})
}
   let events = new event({
    eventName:req.body.eventName,
    id:saved._id
   })
   await events.save();
  res.send('your basic info was saved!')
}


}

exports.searchEvent = async(req,res)=>{

    try{
        let data = await event.find({eventName: new RegExp(req.body.eventName,'i')});
        res.status(200).send(data)
       }catch(e){
        res.status(400).send("regexp")
       }
    
}

exports.getEvent = async(req,res)=>{

    let isValidType = mongoose.Types.ObjectId.isValid(req.body.id)
    if(isValidType === false){
        res.status(400).send('improper id');
    }else{
    let data  = await EventSetup.find({_id:req.body.id});
    if(data.length === 0){
    res.status(200).send('no search')
    }else{
        res.status(200).send(data)
    }
    }
    console.log()
    
}

exports.buyTicket = async(req,res)=>{


    let bodyObj = req.body
    var ticketDetails = req.body.ticketDetails;
    let eventSetupTicket = await EventSetup.findOne({_id:req.body.id});
    let tickets = eventSetupTicket.tickets;
    let responseData = []
for(let i =0;i<ticketDetails.length;i++){
let obj = ticketDetails[i];
for(let key in tickets){
    if(obj.ticketName === tickets[key].divisionName){      
if(tickets[key].ticketCount>tickets[key].ticketSell){
    await EventSetup.updateOne({_id:req.body.id,"tickets.divisionName":obj.ticketName},{$inc:{"tickets.$.ticketSell":obj.items}})
    let eventAttendee = await event.findOne({id:req.body.id,attendees:req.body.email});
     let cloneObj = (({ticketDetails,...o})=>o)(bodyObj);
     let cloneObj_2 = {
        ...cloneObj,
        ticketDetails:[obj]
     }
     
     let isParticipate = await participatedEvent.findOne({id:req.body.id,email:req.body.email});
     if(!isParticipate){
        let participatedEventData = new participatedEvent(cloneObj_2)
        await participatedEventData.save();
     }else{
       console.log(obj) // --> it gives the ticket list
       let isParticipateThere = await participatedEvent.findOne({id:req.body.id,email:req.body.email,"ticketDetails.ticketName":obj.ticketName})
        if(!isParticipateThere){
            await participatedEvent.updateOne({id:req.body.id,email:req.body.email},{$push:{ticketDetails:obj}})
        }else{
          await participatedEvent.updateOne({id:req.body.id,email:req.body.email,"ticketDetails.ticketName":obj.ticketName},{$inc:{"ticketDetails.$.items":obj.items}})    

        }
    }

    if(!eventAttendee){
        await event.updateOne({id:req.body.id},{$push:{attendees:req.body.email}})
    }
    responseData.push({eventName:obj.ticketName,msg:"your ticket is booked!",status:true})
}else{
    responseData.push({eventName:obj.ticketName,msg:"sorry! ticket is fully booked",status:false})
}
    }
  

}
}
   res.send(responseData)


}

exports.participatedEvent = async(req,res)=>{

    let obj = {
        ...req.body,
        isActive:false,
        isClosed:false,
        upComing:true
    }
let data = new participatedEvent(obj);
let dt = await data.save()
res.send(dt)

}
exports.myTickets = async(req,res)=>{

    let userTicketHistory = await participatedEvent.find({email:req.body.email,isDinner:true});
    res.send(userTicketHistory);

}
exports.totalTicket = async(req,res)=>{

    console.log('it is inside')
    let eventSetups = await EventSetup.findOne({_id:req.body.id});
    if(!eventSetups){
        console.log('it is in null')
        res.status(400).send('there is no event in your given id')
    }else{
        console.log('it is in not null propertty')
        let ticketData = eventSetups.tickets
        for(let key in ticketData){
            let isSame =  ticketData[key].divisionName === req.body.divisionName;
            if(isSame === true){
                let ticketCount = ticketData[key].ticketCount;
                let ticketSell =ticketData[key].ticketSell;
                if(ticketCount>ticketSell){
                    console.log('it is high count')
                    res.status(200).send({
                        totalTicket:ticketCount,
                        ticketSell:ticketSell,
                        balanceTicket: ticketCount - ticketSell,
                        isTicketFull:false
                    })
                }else{
                    console.log('it is less count')
                    res.status(200).send({
                        totalTicket:ticketCount,
                        ticketSell:ticketSell,
                        balanceTicket: ticketCount - ticketSell,
                        isTicketFull:true
                    })
                }

            }else{
                res.status(400).send('there is no ticket which is mentioned by you')

            }

        }
    }

}