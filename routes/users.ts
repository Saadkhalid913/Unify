import * as express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import * as _ from "lodash"
import { userModel } from "../models/models"

const router = express.Router()



router.post("/", async (req: any, res: any) => {
    const {email, password, username} = req.body
    const user = new userModel({email, password, username})
    const response = await user.save()
    res.send(_.pick(response, ["username", "email"]))
})




module.exports = router