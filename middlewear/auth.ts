import bcyrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import express from "express"
import config from "config"
import { exception } from "console"

export function auth(req: any, res: express.Response, next: Function) : any {
    let token = req.headers["user_auth_token"] 
    if (!token) token = req.body["user_auth_token"] 
    if (!token) {
        return res.status(402).send("No token provided")
    }
    try {
        const decoded = jwt.verify(token, config.get("key"))
        req._user = decoded
        next()
    }

    catch(err) {
        res.status(401).send("invalid credentials")
    }
}