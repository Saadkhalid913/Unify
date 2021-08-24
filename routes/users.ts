import * as express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import * as _ from "lodash"
import { userModel } from "../models/models"
import { validateBody , validateSignupBody} from "../utils/validationsFunctions"

const router = express.Router()

interface SignUpBody {
    name: String;
    email: String;
    password: String;
} 

router.post("/", async (req: any, res: any, next: Function) => {
    const isValid = await validateSignupBody(req,res)
    if (!isValid) return 
    const {username, password, email } = req.body
    const user = new userModel({email, password, username})
    const response = await user.save()
    res.send(_.pick(response, ["username", "email"]))
})





module.exports = router