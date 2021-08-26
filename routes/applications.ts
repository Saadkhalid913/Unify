import express from "express"
import app from "express/lib/application"
import mongoose from "mongoose"
import { auth } from "../middlewear/auth"
import { validateApplicationBody } from "../utils/validationsFunctions"
const applicationRouter = express.Router()


applicationRouter.post("/", auth, async (req: any,res: express.Response) => {
    const isValid = await validateApplicationBody(req,res)
    if (!isValid) return 
    res.send("Valid!")
})


export default applicationRouter