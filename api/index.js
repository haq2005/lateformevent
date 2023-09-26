var express = require('express');
var morgan = require('morgan');
var app = express();
var socketio = require('socket.io');
var http = require('http')
var server = http.createServer(app)
var io = socketio(server,{cors:{origin:"*"}});
var cors = require('cors');
var mongoose = require('mongoose');
var methodOverride = require('method-override')
var {Worker, workerData} =require('worker_threads')
var {notificationSender}  = require('./firebase/notificationSender')
const path = require('path');

    require('dotenv').config()
var register = require('./Routers/register');
var login = require('./Routers/login')
var forgot = require('./Routers/forgot')
var setup = require('./Routers/setup')
var update = require('./Routers/update')
var tickets = require('./Routers/Tickets')
var events = require('./Routers/events')
var statistic = require('./Routers/statistics')
var stripe = require('./Routers/stripe')
var groupchat = require('./Routers/groupchat')
var eventHandling = require('./Routers/eventHandling')
var imageHandler = require('./Routers/imageHandler')
var {retriveGroupChat,storeGroupChat, uploadOnlineToken, uploadOfflineToken, handlingToken} = require('./socket/groupchat')
var {privateChatStore, privateChatRetrive} = require('./socket/privatechat')
var attendeeProfile = require('./Routers/attendeeProfile');
const groupMessage = require('./Scehma/groupMessage');
var community = require('./Routers/community')
var privateChat = require('./Routers/privateChat')
var innerNotification = require('./Routers/innerNotification');
const privateChatSchema = require('./Scehma/privateChatSchema');
var audioHandler = require('./Routers/audioHandler');
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

//
app.get('/getIndexTest',(req,res)=>{

    res.send('hello world')
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
    console.log('app is listen at 8001')
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

