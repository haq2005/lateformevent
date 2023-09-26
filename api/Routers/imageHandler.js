var express = require('express');
var multer = require('multer')

var Grid =  require('gridfs-stream');
var mongoose = require('mongoose')
var router = express.Router();
const organizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
const attendeeRegistrationSchema = require('../Scehma/attendeeRegistrationSchema');
const community = require('../Scehma/community');
//storage engine
var storage = require('../storageEngine')

  var upload = multer({storage})

  router.post('/uploadOrganizerProfile',upload.single('image'),async(req,res)=>{
    console.log(req.file)
    console.log(req.body.email)
await organizerRegisterSchema.updateOne({email:req.body.email},{$set:{profilePic:req.file.filename}})
let r = await community.updateOne({createdBy:req.body.email},{$set:{profilePic:req.file.filename}})
console.log(r)
res.status(200).send('image uploaded successfully!')
  })

  router.post('/uploadAttendeeProfile',upload.single('image'),async(req,res)=>{
    console.log('working..')
    console.log(req.file)
    console.log(req.body.email)
    await attendeeRegistrationSchema.updateOne({email:req.body.email},{$set:{profilePic:req.file.filename}})

    res.status(200).send('image uploaded successfully!')
  })
  router.get('/getImage/:name',async(req,res)=>{
    console.log('workinging get')
    let conn = mongoose.createConnection(process.env.MONGODB_URL);
   let gfs =    Grid(conn,mongoose.mongo);
    let collection = gfs.collection('uploads');
let result = await collection.findOne({filename:req.params.name});
  if(!result){
    console.log("no image")
  res.status(400).send("there is no image url")
  }else{
    console.log(result._id)
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'uploads'});
    let readStream = gridFSBucket.openDownloadStream(result._id);
    readStream.pipe(res)
  }
    
    })

    router.post('/uploadEventThumb',upload.single('image'),async(req,res)=>{
      console.log('working..')
   
  res.status(200).send(req.file.filename)
    })


  module.exports = router