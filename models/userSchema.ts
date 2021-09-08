import { array } from "joi"
import mongoose from "mongoose"
import config from "config"
import * as jwt from "jsonwebtoken"


const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 6,
        maxlength: 64,
        trim: true,
        lowercase: true, 
        
    },

    email: {
        type: String,
        required: true, 
        lowercase: true, 
        minlength: 3, 
        unique: true, 
        maxlength: 255,
        match: emailValidationPattern
      },

    password: {
        type: String,
        required: true,
        maxlength: 512,
    },

    extracurriculars: {
        type: Array,
        default: [], 
        ref: "extracurriculars",
    },

    targetSchools: {
        type: Array,
        required: true, 
        default: [],
    },

    applications: {
        type: Array,
        ref: "applications",
        default :[]
    },
    essays: {type: Array,
            ref: "essays",
            default: []}
})

userSchema.methods.generateAuthToken = function () {
    const priv_key: jwt.Secret  = config.get("key")
    const token = jwt.sign({ _id: this._id }, priv_key)
    return token
}


export default userSchema