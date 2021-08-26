import express from "express"
import { extracurricularModel, userModel } from "../models/models"
import { validateExtracurricularBody } from "../utils/validationsFunctions"
import {auth} from "../middlewear/auth"
import mongoose from "mongoose"



const router = express.Router()

router.post("/", auth, async (req: any, res: express.Response) => {
    const isValid = await validateExtracurricularBody(req,res)
    if (!isValid) return 
    const { name , description , dateStarted, dateEnded, onGoing } = req.body 
    const newExtracurricular: any = new extracurricularModel({ name , description , dateStarted, dateEnded, onGoing })
    const userID = req._user._id 
    const response = await userModel.findByIdAndUpdate(userID, { $push: { extracurriculars: newExtracurricular } })

    res.send(newExtracurricular._doc)
})


export default router 