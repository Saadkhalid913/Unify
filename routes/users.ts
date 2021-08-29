import * as express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import * as _ from "lodash"
import { userModel } from "../models/models"
import { validateBody , validateSignupBody} from "../utils/validationsFunctions"
import * as jwt from "jsonwebtoken"
import { auth } from "../middlewear/auth"


const userRouter = express.Router()

interface User {
    _id: mongoose.ObjectId;
    username: String;
    email: String;
    extracurriculars: any[];
    applications: Application[];
    targetSchools: String[];
    password: string;
    generateAuthToken: () => string

}

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

userRouter.post("/", async (req: any, res: any, next: Function) => {
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

userRouter.post("/login", async (req: any, res: express.Response) => {
    const { email , password } = req.body 
    const user : User = await userModel.findOne({email})
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
        return res.send({user_auth_token: user.generateAuthToken()})
    }
    else {
        return res.send({error: "Invalid credentials"})
    }
})


userRouter.get("/verify", auth, (req: any, res: express.Response) => {
    res.send({message: "You are verified!"})
})




async function encryptPassword(password: string) : Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}   

export default userRouter