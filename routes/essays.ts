import { essayModel, userModel  } from "../models/models";
import express from "express"
import { auth } from "../middlewear/auth"

const essayRouter = express.Router()

essayRouter.post("/", auth, async (req: any, res: express.Response) => {
    try {
        const { title, body, targetSchool } = req.body;
        const essay = new essayModel({title, body, targetSchool})
        const result = await essay.save();
        const user = await userModel.findByIdAndUpdate(req._user._id, {$push: {essays: result._id}})
        return res.send(result)
    }
    catch(err) {
        return res.status(503).send("Could not save your essay")
    }
})
essayRouter.get("/", auth, async (req: any, res: express.Response) => {
    const userID = req._user._id;
    const essays = await userModel.findById(userID).select("essays").populate("essays")
    res.send(essays["essays"])
})

essayRouter.get("/:id", auth, async (req: any, res: express.Response) => {
    const ID = req.params.id
    const essay = await essayModel.findById(ID)
    res.send(essay)
})

essayRouter.put("/:id", auth, async (req: any, res: express.Response) => {
    const {title, body} = req.body;
    const id = req.params.id
    const result = await essayModel.findByIdAndUpdate(id, {title: title, body: body});
    res.send(result)
})
essayRouter.delete("/:id", auth, async (req: any, res: express.Response) => {
    const id = req.params.id;
    const result = await essayModel.findByIdAndDelete(id)
    res.send(result)
})




export default essayRouter;
