import bcyrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import express from "express"

export function auth(req: any, res: express.Response, next: Function) : res.Response {
    let token = req.headers.user_auth_token 
    if (!token) token = req.body.user_auth_token 
    if (!token) {
        return res.status(401).send("No token provided")
    }
}