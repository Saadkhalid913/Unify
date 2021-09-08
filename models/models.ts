// This file contains all collections for the Unify API 


import userSchema from "./userSchema"
import extracurricularSchema from "./extracurricularSchema"
import applicationSchema from "./applicationSchema"
import essaySchema from "./essaySchema"

import mongoose from "mongoose"


export const extracurricularModel = mongoose.model("extracurriculars", extracurricularSchema)
export const essayModel = mongoose.model("essays", essaySchema)
export const userModel = mongoose.model("users", userSchema)
export const applicationModel = mongoose.model("applications", applicationSchema)


