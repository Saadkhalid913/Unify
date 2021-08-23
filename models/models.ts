import extracurricularSchema from "./extracurricularSchema";

import mongoose from "mongoose"

const extracurricularModel = mongoose.model("extracurriculars", extracurricularSchema)

export default {
    extracurricularModel
}