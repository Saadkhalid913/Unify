const userRouter = require("../routes/users")

module.exports = (app: any) => {  
    app.use("/users", userRouter)
}