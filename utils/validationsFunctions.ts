import express, { response } from "express"
const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
import { userModel } from "../models/models"
import mongoose from "mongoose"


export function validateBody(request : any, response: express.Response, fields: Array<string>): any {
    // this is a middlewear function used to ensure that the 
    const { body } = request 
    for (let field of fields) {
        if (!body[field]) {
            response.status(400).send(`please provide the field: ${field}`)
            return false
    }}      

    return body
}


export async function validateSignupBody(req: any, res: express.Response): Promise<boolean> {
    const { body } = req

    if (!validateBody(req,res,["username", "password", "email"])) {
        return false 
    }

    if (!body.password || body.password.length < 8) {
       res.status(400).send("Please enter a password >= 8 characters")
       return false
    }

    if (!body.username || body.username.length < 8) {
        res.status(400).send("Please enter a valid username (longer than 8 characters)")
        return false
    }
    
    if (!body.email || !body.email.match(emailValidationPattern)) {
        res.status(400).send("Please enter a valid email")
        return false
    } 

    const existingEmailUser = await userModel.findOne({email: body.email})
    const existingUsernameUser = await userModel.findOne({username: body.username})

    if (existingUsernameUser) {
        res.status(400).send(`Username: ${body.username} is not available`)
        return false 
    }

    if (existingEmailUser) {
        res.status(400).send(`Email: ${body.email} is already in use`)
        return false 
    }


    return true
}