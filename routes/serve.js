const express = require("express");
const router = express.Router()
const path = require("path")


router.get("/", (req,res) => {  return res.sendFile(path.join(__dirname, "/build/index.html"))  })
router.get("/:filename", (req,res) => {  return res.sendFile(path.join(__dirname, "/build", req.params.filename))  })
router.get("/static/css/:filename", (req,res) => {  return res.sendFile(path.join(__dirname, "/build/static/css/", req.params.filename))  })
router.get("/static/js/:filename", (req,res) => {  return res.sendFile(path.join(__dirname, "/build/static/js/",req.params.filename))  })


module.exports = router