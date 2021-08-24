import userSchema from "./userSchema"
import extracurricularSchema from "./extracurricularSchema"
import mongoose from "mongoose"


export const extracurricularModel = mongoose.model("extracurriculars", extracurricularSchema)
export const userModel = mongoose.model("users", userSchema)


