const express = require("express");
const multer = require("multer");
const Grid = require("gridfs-stream");
var { GridFsStorage } = require("multer-gridfs-storage");
var uniqid = require("uniqid");
const mongoose = require("mongoose");
const router = express.Router();
//storage engine
const storage = require("../storageEngine");

let gfs;

let conn = mongoose.createConnection(process.env.MONGODB_URL);
conn.once("open", () => {
  gfs = Grid(conn, mongoose.mongo);
  gfs.collection("glance");
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.status(200).send("image uploaded working");
});

// router.post("/glanceVideo", [upload.single("file")], async (req, res) => {
//   res.json(req.file);

//   //res.status(200).send("image uploaded successfully!");
// });
// router.post("/glanceVideo", async (req, res) => {
//   console.log(req.body);
  
//   console.log(req.title);
//   try {
//     const storage = new GridFsStorage({
//       url: process.env.MONGODB_URL,
//       file: (Req, file) => {
//         console.log("Looking for .........", file);
//         return new Promise((resolve, reject) => {
//           if (
//             file.mimetype === "video/mp4" ||
//             file.mimetype === "video/webp" ||
//             file.mimetype === "video/ogg"
//           ) {

//             const fileInfo = {
//               filename: uniqid(),
//               metadata: {
//                 title: req.body.title,
//                 duration: req.body.duration,
//               },
//               bucketName: "glance",
//             };
//             resolve(fileInfo);
//           }
//         });
//       },
//     });

//     const upload = multer({ storage }).single("file");

//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }

//       // File uploaded successfully, you can respond with additional information if needed
//       res.status(200).json({
//         message: "File uploaded successfully",
//         fileId: req.file.id,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/glanceVideo", async (req, res) => {
  console.log("prams is ",req.query);
  console.log("body is ",req.body);
  
  try {
    const storage = new GridFsStorage({
      url: process.env.MONGODB_URL,
      file: (Req, file) => {
        
        return new Promise((resolve, reject) => {
          if (
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/webp" ||
            file.mimetype === "video/ogg"
          ) {

            const fileInfo = {
              filename: uniqid(),
              metadata: {
                title: req.query.title,
                duration: req.query.duration,
              },
              bucketName: "glance",
            };
            resolve(fileInfo);
          }
        });
      },
    });

    const upload = multer({ storage }).single("file");

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // File uploaded successfully, you can respond with additional information if needed
      res.status(200).json({
        message: "File uploaded successfully",
        // w
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
