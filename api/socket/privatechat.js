var  privateChatSchema = require("../Scehma/privateChatSchema");

async function privateChatStore(id,obj){
let isThere = await privateChatSchema.findOne({id:id});
if(isThere){
    await privateChatSchema.updateOne({id:id},{$push:{chats:obj.msg[0]}})
    console.log("message stored in db successfully")
}
}

async function privateChatRetrive(id,socket){
    console.log("retriving chat..")
    let messages = await privateChatSchema.findOne({id});
    if(!messages){
        let res = []
         socket.emit('retriveOldPrivMessages',res)
     
     }else{
       console.log(messages.chats)
         socket.emit('retriveOldPrivMessages',messages.chats)
     }
}
module.exports = {privateChatStore,privateChatRetrive}