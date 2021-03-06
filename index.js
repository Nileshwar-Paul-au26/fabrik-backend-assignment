const express = require('express');
const dotenv = require('dotenv');
const multer = require("multer");
const ejs = require("ejs");

const base64 = require("js-base64");
const cloudinary = require("cloudinary");
dotenv.config()

const app = express();
app.set("view engine", "ejs");
let imgurl;
let PORT = process.env.PORT || 8000
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true,
});
//Storing Files uploaded by User Inmemory(not in disk because we want the buffer format data of the file) through multer
const uploader = multer({ storage: multer.memoryStorage() });
app.listen(PORT, console.log(`Server listening on Port ${process.env.PORT}`));

app.get("/", (req, res) => {
    res.render("index");
});
app.post("/submit", uploader.single("image"), (req, res) => {
    console.log(req.file)
    //converting the file data to base64 string format require by the cloudinary
    let stringdata = base64.encode(req.file.buffer);
    cloudinary.v2.uploader.upload(
        `data:${req.file.mimetype};base64,${stringdata}`,
        function (err, result) {
            if (err) {
                console.log(err)
                res.send('error: ' + err.message)
            }
            imgurl = result.secure_url
            res.send("Uploded")
        }
    );
});
app.get('/display',(req,res) => {
    res.render("gallery",{imgurl:imgurl});
})
app.get('*', (req, res) => {
    res.send("Not Found");
})
