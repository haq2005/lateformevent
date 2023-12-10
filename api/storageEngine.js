var { GridFsStorage } = require("multer-gridfs-storage");
var uniqid = require("uniqid");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => {
    console.log("Looking for .........", file);
    return new Promise((resolve, reject) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/webp"
      ) {
        const fileInfo = {
          filename: uniqid(),
          bucketName: "uploads",
        };
        resolve(fileInfo);
      } else if (
        file.mimetype === "video/mp4" ||
        file.mimetype === "video/webp" ||
        file.mimetype === "video/ogg"
      ) {
        console.log("Looking for", req);

        const fileInfo = {
          filename: uniqid(),
          metadata: {
            title: "am only human",
            duration: req.body.duration || 45,
          },
          bucketName: "glance",
        };
        resolve(fileInfo);
      } else {
        const fileInfo = {
          filename: uniqid(),
          bucketName: "audios",
        };
        resolve(fileInfo);
      }
    });
  },
});

module.exports = storage;
