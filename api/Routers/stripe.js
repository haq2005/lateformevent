var express = require('express');
var stripe = require('stripe')(process.env.STRIPE_SEC_KEY_LIVE_MODE,{maxNetworkRetries:10})
var organizerRegisterSchema = require('../Scehma/organizerRegisterSchema')
var EventSetup = require('../Scehma/eventSetup')
var event = require('../Scehma/event');
var participatedEvent = require('../Scehma/participatedEvent');
var stripes = require('../Scehma/stripe');

var router = express.Router()
router.use(express.raw({type: "*/*"}));
router.use(express.json())

router.post('/createStripeAccount',async(req,res)=>{
// if(!req.body.email){
// res.status(400).send('email is required')
// }else{
//   let isThere = await organizerRegisterSchema.findOne({email:req.body.email});
//   if(!isThere){
// res.status(400).send('register your account first')
//   }else{
//     const account = await stripe.accounts.create({type: 'standard'});
//    await organizerRegisterSchema.updateOne({email:req.body.email},{$set:{stripeId:account.id}})
 

//     res.status(200).send('account created')
   
//   }
// }

const account = await stripe.accounts.create({type: 'standard'});
res.status(200).send(account)
});
//url

router.post('/stipeURL',async(req,res)=>{
    if(!req.body.email){
        res.status(400).send("there is no email")
    }else{
        let isThere = (await organizerRegisterSchema.findOne({email:req.body.email})).stripeId;
       
        if(!isThere){
            res.status(400).send("user not opened stripe account")
        }else{
                let accountLink = await stripe.accountLinks.create({
        account: isThere,
        refresh_url: 'http://localhost:3000/#/organizer/dashboard',
        return_url: 'http://localhost:3000/#/organizer/dashboard',
        type: 'account_onboarding',
    })
            res.status(200).send(accountLink)
        }
    }

})

//acct_1N1XRgSEkNgX5pfm
router.post('/isAccoutVerified',async(req,res)=>{
    if(!req.body.email){
        res.status(400).send('email is required')
        }else{
          let isThere = await organizerRegisterSchema.findOne({email:req.body.email});
          if(!isThere){
        res.status(400).send('register your account first')
          }else{
        if(!isThere.stripeId){
            res.status(200).send('create a stripe account through lateform to enable')
        }else{
            let stripeRes = await stripe.accounts.retrieve(isThere.stripeId);
            res.status(200).send(stripeRes)
        }
          }
        }
})

router.post('/accountDetail',async(req,res)=>{
  console.log("account detail",req.body)
  const balance = await stripe.balance.retrieve({
    stripeAccount: req.body.stripeId,
  });
  res.status(200).send(balance)
})
// book ticket function


//checkout ticket
router.post('/checkoutTicket',async(req,res)=>{
  var stripeAccountId = await organizerRegisterSchema.findOne({email:req.body.organizerMail});
  
  var checkoutUrl = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items: [{
        price: req.body.ticketDetails[0].stripePriceId,
        quantity:req.body.ticketDetails[0].items
    }],
    payment_intent_data: {
        application_fee_amount: 0,
        transfer_data: {destination:stripeAccountId.stripeId},
      },
   metadata:{
    email:req.body.email,
    name:req.body.name,
    isAttend:req.body.isAttend,
  ticketName:req.body.ticketDetails[0].ticketName,
  items:req.body.ticketDetails[0].items,
    balanceBreak:req.body.balanceBreak,
    id:req.body.id,
    organizerMail:req.body.organizerMail,
    ticketPrice:req.body.ticketDetails[0].ticketPrice
   },
    success_url:"http://localhost:3000/#/event-invitation?id="+req.body.id,
    cancel_url:"http://localhost:3000/#/event-invitation?id="+req.body.id
})
let isStipeSessionThere = await stripes.findOne({organizerEmail:req.body.organizerMail});
if(!isStipeSessionThere){
  let dt = new stripes({
    organizerEmail: req.body.organizerMail,
    sessionId: checkoutUrl.id
  })
  await dt.save()
}else{
  await stripes.updateOne({organizerEmail:req.body.organizerMail},{$push:{sessionId:checkoutUrl.id}})
}

res.send(checkoutUrl.url)
})

//payment data

router.post('/paymentData',async(req,res)=>{
  let dt = await stripes.findOne({organizerEmail:req.body.email});
  let allSessionId = dt.sessionId;
  let lengthSI = allSessionId.length;
  console.log('payment data')
  console.log(req.body)
  let data = await Promise.all(
    allSessionId.map(async(val)=>{
      
      const session = await stripe.checkout.sessions.retrieve(
val
        );
        let stripeDate = Date(session.created);
let month = new Date(stripeDate).getMonth()+1;
let date = new Date(stripeDate).getDate()-1;
let year = new Date(stripeDate).getFullYear()
let newDate = date+"."+month+"."+year
console.log(session.created)
      return {
        total:session.amount_total/100,
        date: newDate,
        buyerName:session.metadata.name,
        buyerEmail:session.metadata.email,
        ticketName:session.metadata.ticketName,
        items: session.metadata.items,
        paymentStatus: session.payment_status
      }
    })
  );
 
  let obj = {
    length:lengthSI,
    data
  }
  res.status(200).send(obj)
})

//buy ticket function
let bookTicket = async(meta)=>{
  console.log(meta)
  let eventSetupTicket = await EventSetup.findOne({_id:meta.id});
  let tickets = eventSetupTicket.tickets;
  for(let key in tickets){
    if(meta.ticketName === tickets[key].divisionName){      
  if(tickets[key].ticketCount>tickets[key].ticketSell){
    await EventSetup.updateOne({_id:meta.id,"tickets.divisionName":meta.ticketName},{$inc:{"tickets.$.ticketSell":parseInt(meta.items)}})
    let eventAttendee = await event.findOne({id:meta.id,attendees:meta.email});

     
     let isParticipate = await participatedEvent.findOne({id:meta.id,email:meta.email});
     if(!isParticipate){
        let participatedEventData = new participatedEvent({id:meta.id,email:meta.email,isAttend:meta.isAttend,ticketDetails:[{ticketName:meta.ticketName,ticketPrice:meta.ticketPrice,items:parseInt(meta.items)}]})
        await participatedEventData.save();
     }else{
       console.log(meta) // --> it gives the ticket list
       let isParticipateThere = await participatedEvent.findOne({id:meta.id,email:meta.email,"ticketDetails.ticketName":meta.ticketName})
        if(!isParticipateThere){
            await participatedEvent.updateOne({id:meta.id,email:meta.email},{$push:{ticketDetails:{ticketName:meta.ticketName,ticketPrice:meta.ticketPrice,items:parseInt(meta.items)}}})
        }else{
          await participatedEvent.updateOne({id:meta.id,email:meta.email,"ticketDetails.ticketName":meta.ticketName},{$inc:{"ticketDetails.$.items":parseInt(meta.items)}})    
  
        }
    }
  
    if(!eventAttendee){
        await event.updateOne({id:meta.id},{$push:{attendees:meta.email}})
    }
  }else{
console.log('ticket is fully booked!')
  }
    }
  
  
  }
}

router.post('/approvedVerified',async(req,res)=>{
await organizerRegisterSchema.updateOne({stripeId:req.body.stripeId},{$set:{isStripeVerified:true}});
res.status(200).send("stripe account verified!")
})

router.post('/getApprovedVerified',async(req,res)=>{
  let account = await organizerRegisterSchema.findOne({email:req.body.email});
  if(!account.stripeId){
    res.status(400).send("sorry you only proceed your events for free. if you need to proceed at cash. please setup payment!")
  }else{
    res.status(200).send("you can set your ticket")
  }
  })

//stripe webhook for development
router.post('/webhook',(request, response) => {
  console.log('stripe is called')
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (process.env.STRIPE_SECRET_KEY) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_KEY
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
if(event.type === "checkout.session.completed"){
console.log('this is from webhooks',event.data)
  console.log(event.data.object.metadata)
bookTicket(event.data.object.metadata)
}else{
  console.log(event.type)
}
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
module.exports = router;