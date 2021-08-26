import userRouter from "../routes/users"
import extracurricularRouter from "../routes/extracurriculars"
import applicationRouter from "../routes/applications"
module.exports = (app: any) => {  
    app.use("/users", userRouter)
    app.use("/extracurriculars", extracurricularRouter)
    app.use("/applications", applicationRouter)
}