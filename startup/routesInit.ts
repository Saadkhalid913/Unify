const userRouter = require("../routes/users")
import extracurricularRouter from "../routes/extracurriculars"
module.exports = (app: any) => {  
    app.use("/users", userRouter)
    app.use("/extracurriculars", extracurricularRouter)
}