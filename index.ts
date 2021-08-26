import config from "config"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"


const app = express()


// add middlewear and check config vars 
require("./startup/middlewearInit")(app)
require("./startup/configInit")()

mongoose.connect(config.get("URI"), { useUnifiedTopology: true , useNewUrlParser: true})
mongoose.set('useFindAndModify', false);


require("./startup/routesInit")(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {console.log("Listening on port: " + PORT)})