import express from "express"
import app from "express/lib/application"
import mongoose from "mongoose"
import { auth } from "../middlewear/auth"
import { applicationModel, userModel } from "../models/models"
import { validateApplicationBody } from "../utils/validationsFunctions"
const applicationRouter = express.Router()


applicationRouter.post("/", auth, async (req: any,res: express.Response) => {
    const isValid = await validateApplicationBody(req,res)
    const userID = req._user._id

    if (!isValid) return 

    if (!!parseInt(req.body.includeAllExtraCurriculars)) {
        const extracurriculars = await userModel.findById(userID).select("extracurriculars")
        req.body.relevantExtracurriculars = extracurriculars["extracurriculars"]
    }

    const newApplication: any = new applicationModel(req.body)
    
    try {
        const result = await newApplication.save()
        await userModel.findByIdAndUpdate(userID, {$push : { applications: result._id}})
        res.send(result)
    }
    catch(err) {
        res.status(503).send("There was an error")
    }
})


export default applicationRouter