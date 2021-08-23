import cors from "cors"
import express from "express"

module.exports = (app: any) => {
    app.use(cors({origin: "*"}))
    app.use((express as any).json())
}