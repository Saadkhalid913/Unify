import express from "express"
import app from "express/lib/application"
import mongoose from "mongoose"
import { auth } from "../middlewear/auth"
import { applicationModel, userModel } from "../models/models"
import { validateApplicationBody } from "../utils/validationsFunctions"
const applicationRouter = express.Router()


applicationRouter.post("/", auth, async (req: any,res: express.Response) => {
    const isValid = await validateApplicationBody(req,res)
    if (!isValid) return 
    
    const newApplication: any = new applicationModel(req.body)
    const userID = req._user._id

    try {
        const result = await userModel.findByIdAndUpdate(userID, {$push : { applications: applicationModel}})
        console.log("RESULT: ", result)
        res.send(newApplication._doc)
    }
    catch(err) {
        res.status(503).send("There was an error")
    }
})


export default applicationRouter