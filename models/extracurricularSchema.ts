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
        // @ts-ignore
        required: () => !this.onGoing
    },

    onGoing: {
        type: Boolean,
        default: false
    }
})

export default extracurricularSchema