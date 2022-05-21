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