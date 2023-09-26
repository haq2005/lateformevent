const event = require('../Scehma/event');
let attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema')
exports.retriveMembers = async(req,res)=>{

    console.log(req.body)
    let members = await event.findOne({id:req.body.id});
    let memberData = await Promise.all(
    members.attendees.map(async(val)=>{
        let attendee = await attendeeRegistrationSchema.findOne({email:val})
        console.log(val)
        return {name:attendee.fullName,_id:attendee._id}
        })
  )
res.send(memberData)

}