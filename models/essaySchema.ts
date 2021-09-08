import mongoose from "mongoose"

const essaySchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength: 256},  
    body: {type: String, required: true, maxlength: 16000},
    targetSchool: {type: String}
})

export default essaySchema