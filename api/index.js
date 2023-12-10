const express = require('express');
const morgan = require('morgan');
const app = express();
const socketio = require('socket.io');
const http = require('http')
const server = http.createServer(app)
const io = socketio(server,{cors:{origin:"*"}});
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const {Worker, workerData} =require('worker_threads')
const {notificationSender}  = require('./firebase/notificationSender')
const path = require('path');

    require('dotenv').config()
const register = require('./Routers/register');
const login = require('./Routers/login')
const forgot = require('./Routers/forgot')
const setup = require('./Routers/setup')
const update = require('./Routers/update')
const tickets = require('./Routers/Tickets')
const events = require('./Routers/events')
const statistic = require('./Routers/statistics')
const stripe = require('./Routers/stripe')
const groupchat = require('./Routers/groupchat')
const eventHandling = require('./Routers/eventHandling')
const imageHandler = require('./Routers/imageHandler')
const {retriveGroupChat,storeGroupChat, uploadOnlineToken, uploadOfflineToken, handlingToken} = require('./socket/groupchat')
const {privateChatStore, privateChatRetrive} = require('./socket/privatechat')
const attendeeProfile = require('./Routers/attendeeProfile');
const groupMessage = require('./Scehma/groupMessage');
const community = require('./Routers/community')
const privateChat = require('./Routers/privateChat')
const innerNotification = require('./Routers/innerNotification');
const privateChatSchema = require('./Scehma/privateChatSchema');
const audioHandler = require('./Routers/audioHandler');
const glance = require('./Routers/glance');

const attendeeRegistrationSchema = require('./Scehma/attendeeRegistrationSchema');
//basic ssetup
app.use(morgan('dev'));
app.use('/stripe/webhook',express.raw({ type: "*/*" }))
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors())

//routers
app.use('/login',login)
app.use('/attendeeProfile',attendeeProfile)
app.use('/forgot',forgot)
app.use('/eventSetup',setup)
app.use('/register',register)
app.use('/update',update)
app.use('/tickets',tickets)
app.use('/event',events)
app.use('/statistic',statistic)
app.use('/stripe',stripe)
app.use('/groupchat',groupchat)
app.use('/eventHandling',eventHandling)
app.use('/imageHandler',imageHandler)
app.use('/community',community)
app.use('/privateChat',privateChat)
app.use('/innerNotification',innerNotification)
app.use('/audioHandler',audioHandler)
app.use('/glance',glance)


//
app.get('/getIndexTest',(req,res)=>{

    res.send('hello world brrrrrrrrrrrrrr   ')
})

app.use(express.static(path.join(__dirname,'../ui/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../ui/build/index.html'))
})




async function getToken(id){
       let getToken = await groupMessage.findOne({group:id});
   if(getToken){
    let token = getToken.offlineToken
    return (token)
   }
   else{
    throw "no token"
   }
}
app.post('/sendEventChatNotification',(req,res)=>{
    if(!req.body.groupId){
        res.send("you don't have permission to access this url")
    }else{
       console.log(req.body)

      
       getToken(req.body.groupId).then(resp=>{
        console.log(resp)
        notificationSender(resp,req.body.msg)
res.send(resp)
      }).catch(err=>{
        console.log(err)
      })
      
        
    }
})

app.post('/sendPrivateChatNotification',async(req,res)=>{
    if(!req.body.id){
        res.status(400).send("improper input")
    }else{
        let token = await attendeeRegistrationSchema.findOne({_id:req.body.id});
        if(!token.FCMT){
            res.status(400).send("notification denied")
        }else{
            notificationSender([token.FCMT],req.body.msg)
        }
    }
})

//socket
io.on('connection',(socket)=>{
    console.log('socket is connected')
    //join group chat
    socket.on('joinGroup',async(data)=>{
        console.log('now user joined in',data.groupId)
        socket.join(data.groupId)
        retriveGroupChat(data.groupId,socket)
        handlingToken(data.groupId,data.token)
     
    })
    //join private chat
    socket.on('joinPrivateChat',(data)=>{
        console.log("you join private room: "+data.id)
socket.join(data.id)
privateChatRetrive(data.id,socket)
    })
    //group leave
    socket.on('leaveGroup',(data)=>{
       
        socket.leave(data.groupId)
        // handlingToken(data.groupId,data.token,"offline")

    })
    //leave private chat
    socket.on('leaveChat',(data)=>{
        socket.leave(data.id)
    })
    //sending and storing chat in group
   socket.on('sendMsgToGroupB',async(data)=>{
    let obj = {
        group:data.groupId,
msg:[{from:data.from,email:data.email,msg:data.msg,groupId:data.groupId,type:data.type}]
    }
    storeGroupChat(obj.group,obj)

//notification worker...

// let worker = new Worker('./firebase/notificationWorker.js',{workerData:{id:data.groupId}});
// worker.on('message',data=>{
//     console.log("the data: ",data)
// })
// worker.on('error',(msg)=>{
//     console.log(msg)
// })

//notification worker end

socket.to(data.groupId).emit('sendMsgToGroupF',{from:data.from,email:data.email,msg:data.msg,groupId:data.groupId,type:data.type})
   })

   //sending storing chat in privateChat
   socket.on("sendMsgToPrivB",(data)=>{
    console.log("message received")
    let obj = {
        group:data.groupId,
msg:[{from:data.from,email:data.email,msg:data.msg,groupId:data.groupId,unRead:true,type:data.type}]
    }
    console.log(obj)
    privateChatStore(data.groupId,obj)
    socket.to(data.groupId).emit('sendMsgToPrivF',{from:data.from,email:data.email,msg:data.msg,groupId:data.groupId,type:data.type})
console.log("message send")

    
   })
   socket.on("unReadToRead",async(data)=>{

    console.log("this is from unread:",data)
    
    let res = await privateChatSchema.updateMany({
        id: data.id,
        chats: {
          $elemMatch: {
            email: {
              $not: { $eq: data.email }
            }
          }
        }
      },
      {
        $set: { "chats.$[element].unRead": false }
      },
      {
        arrayFilters: [
          { "element.email": { $not: { $eq: data.email } } }
        ]
      })
      console.log(res)
   })
   socket.on('disconnect',()=>{
    console.log("socket is disconnected")
   })
 
   
})


//server listen
server.listen(process.env.PORT,(err)=>{
if(err){
    console.log('app is not listen');
}
else{
    console.log('app is listening http://localhost:8001/   ')
    console.log(process.env.NODE_ENV)
}

})
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL,(err)=>{
if(err)
    console.log('db is not connected');
else  
    console.log('db is connected')
})


//reminder

