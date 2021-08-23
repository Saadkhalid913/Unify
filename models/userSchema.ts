import { array } from "joi"
import mongoose from "mongoose"


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
        default: []  
    }
})


export default userSchema