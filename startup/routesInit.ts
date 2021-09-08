// this moudule returns a function which initializes all routes for the API 

import userRouter from "../routes/users"
import extracurricularRouter from "../routes/extracurriculars"
import applicationRouter from "../routes/applications"
import essayRouter from "../routes/essays"

module.exports = (app: any) => {  
    app.use("/users", userRouter)
    app.use("/extracurriculars", extracurricularRouter)
    app.use("/applications", applicationRouter)
    app.use("/essays", essayRouter)
}