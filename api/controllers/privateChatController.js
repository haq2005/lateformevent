const { default: mongoose } = require('mongoose');
var privateChatSchema = require('../Scehma/privateChatSchema')
var attendeeRegisterSchema = require('../Scehma/attendeeRegistrationSchema')

exports.createPrivateRoom = async(req,res)=>{

    let user1_id = req.body.id_1;
    let user2_id = req.body.id_2;

let isObjectId_1 =  mongoose.isValidObjectId(user1_id);
let isObjectId_2 = mongoose.isValidObjectId(user2_id)
let isThere = await privateChatSchema.findOne({id:user1_id+user2_id})
if(isObjectId_1 ===false|| isObjectId_2 === false || user1_id === user2_id){
    res.status(400).send("something went wrong with private connection, there is no id providing!")

  }else{
    if(isThere){
res.status(200).send(user1_id+user2_id)
    }else{

let isThere  = await privateChatSchema.findOne({id:user2_id+user1_id})
  if(isThere){
    res.status(200).send(user2_id+user1_id)

  }else{
    let privateChatId = user1_id+user2_id;
   let user_1_email = await attendeeRegisterSchema.findOne({_id:user1_id});
   let user_2_email = await attendeeRegisterSchema.findOne({_id:user2_id}) 
    let dt = new privateChatSchema({
        id:privateChatId,
        createPrivateRoomFor:[{
          email:user_1_email.email,
          name:user_1_email.fullName,
          profilePic:user_1_email.profilePic,
          _id_1:req.body.id_1,
          _id_2:req.body.id_2
        },{
          email:user_2_email.email,
          name:user_2_email.fullName,
          profilePic:user_2_email.profilePic,
          _id_1:req.body.id_1,
          _id_2:req.body.id_2
        }]
    })
    await dt.save();
  
    res.status(200).send(user1_id+user2_id)
  }
  
    }
  }

}

exports.retrivePrivateRoom = async(req,res)=>{

    let privateChatRoom  = await privateChatSchema.aggregate([
        {
          $match: { "createPrivateRoomFor.email": req.body.email } // Match the document by _id
        },
        {
          $project: {
            id:1,
            privateRoomData: {
              $filter: {
                input: "$createPrivateRoomFor",
                as: "user",
                cond: { $ne: ["$$user.email", req.body.email] } // Check if "profilePic" field is undefined
              }
            }
          }
        }
      ])
    res.status(200).send(privateChatRoom)
    
}