import userSchema from "./userSchema"
import extracurricularSchema from "./extracurricularSchema"
import applicationSchema from "./applicationSchema"

import mongoose from "mongoose"


export const extracurricularModel = mongoose.model("extracurriculars", extracurricularSchema)
export const userModel = mongoose.model("users", userSchema)
export const applicationModel = mongoose.model("applications", applicationSchema)


