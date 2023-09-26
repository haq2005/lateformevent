var {GridFsStorage} = require('multer-gridfs-storage');
var uniqid = require('uniqid')

const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    file: (req, file) => {
   console.log(file)
      return new Promise((resolve, reject) => {
       
       
        if(file.mimetype === "image/jpeg"||file.mimetype==="image/png"||file.mimetype==="image/gif"||file.mimetype==="image/jpg"||file.mimetype==="image/webp"){
          const fileInfo = {
            filename: uniqid(),
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        
      }else{

        const fileInfo = {
          filename: uniqid(),
          bucketName: 'audios'
        };
        resolve(fileInfo);
      }
          
          
      });
    }
  });

  module.exports = storage