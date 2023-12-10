var groupMessage = require("../Scehma/groupMessage")

async function storeGroupChat(id,data){
    console.log('function called')
let isThere = await groupMessage.findOne({group:id});
if(!isThere){
    console.log('new message has beed stored')
let dt = new groupMessage(data);
await dt.save()
}else{
    console.log('updating messages')
    await groupMessage.updateOne({group:id},{$push:{msg:data.msg[0]}})
}
}

async function retriveGroupChat(id,socket){
    console.log(id)
    console.log('function triggered')
let messages = await groupMessage.findOne({group:id});

if(!messages){
   let res = []
    socket.emit('retriveOldMessages',res)

}else{
    socket.emit('retriveOldMessages',messages.msg)
}
}



async function handlingToken(id,token){
 console.log('handling token is calling...')
console.log(token)
    let isThere = await groupMessage.findOne({group:id,offlineToken:token});
   console.log(isThere)
    if(!isThere){
       let res =  await groupMessage.updateOne({group:id},{$push:{offlineToken:token}});
console.log(res)
    }


}
module.exports = {storeGroupChat,retriveGroupChat,handlingToken}

