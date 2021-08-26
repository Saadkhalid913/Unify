import mongoose from "mongoose"


const applicationSchema = new mongoose.Schema({
    uniName: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255,
    },

    programName: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255,
    },

    applicationOpenDate: {
        type: Date,
        required: true,
    },

    applicationCloseDate: {
        type: Date,
        required: true,
    },

    expectedResponseDate: Date, 

    relevantExtracurriculars: {
        type: Array,
        required: false,
        default: []
    },

    notes: String,
})


export default applicationSchema