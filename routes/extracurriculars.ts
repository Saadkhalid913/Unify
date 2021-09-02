import express from "express"
import { extracurricularModel, userModel } from "../models/models"
import { validateExtracurricularBody } from "../utils/validationsFunctions"
import {auth} from "../middlewear/auth"
import mongoose from "mongoose"
import extracurricularSchema from "../models/extracurricularSchema"


const extracurricularRouter = express.Router()

extracurricularRouter.post("/", auth, async (req: any, res: express.Response) => {
    const isValid = await validateExtracurricularBody(req,res)
    if (!isValid) return 
    const { name , description , dateStarted, dateEnded, onGoing } = req.body 
    const newExtracurricular: any = new extracurricularModel({ name , description , dateStarted, dateEnded, onGoing })
    const result = await newExtracurricular.save()
    const userID = req._user._id 
    const response = await userModel.findByIdAndUpdate(userID, { $push: { extracurriculars: result._id } })

    res.send(result)
})

extracurricularRouter.get("/", auth, async (req: any, res: express.Response) => {
    const userID = req._user._id
    const extracurriculars = await userModel.findById(userID).select("extracurriculars").populate("extracurriculars")
    res.send(extracurriculars["extracurriculars"])
})

extracurricularRouter.get("/:id", auth, async (req: any, res: express.Response) => {
    const extracurricularID = req.params.id 
    const userID = req._user._id
    const extracurricularInfo = await userModel.findById(userID).select("extracurriculars")
    const extracurriculars : mongoose.ObjectId[] = extracurricularInfo["extracurriculars"]
    const index = extracurriculars.findIndex((e) => e.toString() === extracurricularID)

    if (index < 0) return res.status(401).send("Resource not found")

    const extracurricular = await extracurricularModel.findById(extracurriculars[index])
    return res.send(extracurricular)
})

extracurricularRouter.delete("/:id", auth, async (req: any,res: express.Response) => {
    const response = await extracurricularModel.findByIdAndDelete(req.params.id)
    res.send(response)
})



export default extracurricularRouter