const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const app = express()


// add middlewear and check config vars 
require("./startup/middlewearInit")(app)
require("./startup/configInit")()

mongoose.connect(config.get("URI"), { useUnifiedTopology: true , useNewUrlParser: true})
