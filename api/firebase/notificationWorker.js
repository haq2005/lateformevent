const { token } = require('morgan');
var {parentPort,workerData} = require('worker_threads');
const attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
const event = require('../Scehma/event')
const {notificationSender} = require('./notificationSender')

async function notificationWorker(){
    console.log('function triggerd')
try{
    let eventDetail = await event.findOne({id:workerData.id}).maxTimeMS(15000);
    let eventAttendee = eventDetail.eventAttendee;
    for(let i = 0;i<eventAttendee.length;i++){
let userDetail =  await attendeeRegistrationSchema.findOne({email:eventAttendee[i]}).maxTimeMS(15000);
let token = userDetail.FCMT;
 await notificationSender(token);

    }
    parentPort.postMessage("successfully notification sended!")
}
catch(err){
    parentPort.postMessage(err.message);

}
}
notificationWorker()