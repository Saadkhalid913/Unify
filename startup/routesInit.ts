

module.exports = (app: any) => {
    app.get("/", (req: any, res: any) => { 
        res.send("hello world")
    })
}