const cors = require("cors")
const express = require("express")

module.exports = (app) => {
    app.use(cors({origin: "*"}))
    app.use(express.json())
}