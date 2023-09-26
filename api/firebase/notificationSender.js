
var admin = require("firebase-admin");
var serviceAccount = require('./lateform-firebase.json')
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:"https://lateform-117f2-default-rtdb.firebaseio.com/"
//   });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://lateform-117f2-default-rtdb.firebaseio.com/"
    });

 function notificationSender(token,msg){
console.log('firebase triggered')

if(token.length === 0){
  console.log("no users")
}else{
  admin.messaging().sendToDevice(token,{
    notification:{
        title:"lateform",
        body:msg,
       icon:"https://i.gifer.com/T0WC.gif",
       clickAction:"http://localhost:3000"
    }
  }).then(res=>{
  console.log("seccuess",res)
  }).catch(err=>{
  console.log("error",err)
  })
}

}

module.exports = {notificationSender}