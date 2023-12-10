var express = require('express');
const multer = require('multer');
var router = express.Router();
var storage = require('../storageEngine')

var Grid =  require('gridfs-stream');
var mongoose = require('mongoose')
var upload = multer({storage})
router.post('/uploadVoiceMsg',upload.single('audio'),async(req,res)=>{
    console.log(req.file)
    res.status(200).send(req.file)
})

router.get('/getVoiceMessage/:filename',async(req,res)=>{
    console.log('workinging get')
    let conn = mongoose.createConnection(process.env.MONGODB_URL);
   let gfs =    Grid(conn,mongoose.mongo);
    let collection = gfs.collection('audios');
let result = await collection.findOne({filename:req.params.filename});
  if(!result){
    console.log("no audio")
  res.status(400).send("there is no audio")
  }else{
    console.log(result._id)
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'audios'});
    let readStream = gridFSBucket.openDownloadStream(result._id);
    readStream.pipe(res)
  }
    
})
module.exports = router