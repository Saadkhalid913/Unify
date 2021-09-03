import mongoose from "mongoose"

const extracurricularSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 64,
        required: true,
    },

    description: {
        type: String,
        minlength: 3,
        maxlength: 2048,
        required: false,
    },

    dateStarted: {
        type: Date,
        required: true
    },

    dateEnded: {
        type: Date,
        required: false 
    },

    onGoing: {
        type: Boolean,
        default: true
    },
    
    references: {type: Array}
})

export interface Extracurricular {
    _id: mongoose.ObjectId;
    name: String;
    description: String;
    dateStarted: Number;
    dateEnded: Number;
    onGoing: Boolean;
}


export default extracurricularSchema