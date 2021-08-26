import express from "express"
import { extracurricularModel, userModel } from "../models/models"
import { validateExtracurricularBody } from "../utils/validationsFunctions"
import {auth} from "../middlewear/auth"
import mongoose from "mongoose"



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
    res.send(extracurriculars)
})


export default extracurricularRouter