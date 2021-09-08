import { essayModel, userModel  } from "../models/models";
import express from "express"
import { auth } from "../middlewear/auth"

const essayRouter = express.Router()

essayRouter.post("/", auth, async (req: any, res: express.Response) => {
    const { title, body, targetSchool } = req.body;
    const essay = new essayModel({title, body, targetSchool})
    const result = await essay.save();
    const user = await userModel.findByIdAndUpdate(req._user._id, {$push: {essays: result._id}})
    return res.send(result)
})
essayRouter.get("/", auth, async (req: any, res: express.Response) => {
    const userID = req._user._id;
    const essays = await userModel.findById(userID).select("essays").populate("essays")
    res.send(essays["essays"])
})

essayRouter.put("/:id", auth, async (req: any, res: express.Response) => {
    const {body} = req.body;
    const id = req.params.id
    const result = await essayModel.findByIdAndUpdate(id, {body});
    res.send(result)
})
essayRouter.delete("/:id", auth, async (req: any, res: express.Response) => {
    const id = req.params.id;
    const result = await essayModel.findByIdAndDelete(id)
    res.send(result)
})




export default essayRouter;
