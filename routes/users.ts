import * as express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import * as _ from "lodash"
import { userModel } from "../models/models"
import { validateBody , validateSignupBody} from "../utils/validationsFunctions"
import * as jwt from "jsonwebtoken"
import { auth } from "../middlewear/auth"


const router = express.Router()



router.post("/", async (req: any, res: any, next: Function) => {
    const isValid = await validateSignupBody(req,res)
    if (!isValid) return 
    const {username, password, email } = req.body

    const encryptedPassword = await encryptPassword(password)
    const user: any = new userModel({email, password: encryptedPassword, username})

    try {
        const response = await user.save()
        const token = user.generateAuthToken()
        res.send({user_auth_token: token, ..._.pick(response, ["username", "email"])})
    }
    catch(err) {
        res.status(503).send("There was an error")
        console.log(err)
    }
})


router.get("/verify", auth, (req: any, res: express.Response) => {
    res.send({message: "You are verified!"})
})




async function encryptPassword(password: string) : Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}   

module.exports = router