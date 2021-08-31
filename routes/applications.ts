import express from "express"
import app from "express/lib/application"
import { ValueIteratorTypeGuard } from "lodash"
import mongoose from "mongoose"
import { auth } from "../middlewear/auth"
import { applicationModel, userModel } from "../models/models"
import { validateApplicationBody } from "../utils/validationsFunctions"

const applicationRouter = express.Router()

interface Application {
    _id: mongoose.ObjectId;
    uniName: String;
    programName: String;
    applicationOpenDate: Number;
    applicationCloseDate: Number;
    expectedResponseDate? : Number;
    relevantExtracurriculars: mongoose.ObjectId[];
    notes: String;
    save: () => Application;
}

interface User {
    _id: mongoose.ObjectId;
    username: String;
    email: String;
    extracurriculars: any[];
    applications: Application[];
    targetSchools: String[];
}


applicationRouter.post("/", auth, async (req: any,res: express.Response) => {
    const isValid = await validateApplicationBody(req,res)
    const userID = req._user._id

    if (!isValid) return 

    if (!!parseInt(req.body.includeAllExtraCurriculars)) {
        const extracurriculars = await userModel.findById(userID).select("extracurriculars")
        req.body.relevantExtracurriculars = extracurriculars["extracurriculars"]
    }

    const newApplication: Application = (new applicationModel(req.body) as any)
    
    try {
        const result = await newApplication.save()
        await userModel.findByIdAndUpdate(userID, {$push : { applications: result._id}})
        res.send(result)
    }
    catch(err) {
        res.status(503).send("There was an error")
    }
})


applicationRouter.put("/:id", auth, async (req: any, res: express.Response) => {
    const applicationID = req.params.id
    const isValid = validateApplicationBody(req,res)
    if (!isValid) return 

    try {
        const response = await applicationModel.findByIdAndUpdate(applicationID, req.body)
        res.send(await applicationModel.findById(response._id))
    }

    catch(err) {
        res.status(503).send("There was an error")
    }
})


applicationRouter.delete("/:id", auth, async (req: any, res: express.Response) => {
    const applicationID = req.params.id
    const response = await applicationModel.findByIdAndDelete(applicationID)
    res.send(response)
})



applicationRouter.get("/:id", auth, async (req: any, res: express.Response) => {
    const applicationID = req.params.id
    const userID = req._user._id
    
    const userApplicationInfo = await userModel.findById(userID).select("applications")
    const userApplications : Application[] = userApplicationInfo["applications"] // we take the application array out of the response object 
    const applicationIndex = userApplications.findIndex((x : Application) => x._id.toString() === applicationID)

    if (applicationIndex < 0) return res.status(401).send("Application not found")

    const Application = await applicationModel.findById(applicationID).populate({path: "relevantExtracurriculars", select:["name", "description"]})
    console.log(Application)
    return res.send(Application)
})

applicationRouter.get("/", auth, async (req: any, res: express.Response) => {
    const applicationID = req.params.id
    const userID = req._user._id
    
    const userApplicationInfo = await userModel.findById(userID).select("applications").populate("applications")
    const userApplications : Application[] = userApplicationInfo["applications"] // we take the application array out of the response object 

    return res.send(userApplications)
})


export default applicationRouter