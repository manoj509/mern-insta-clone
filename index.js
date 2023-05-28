const express = require("express")
const path = require("path")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const connectDB = require("./db/db")
const User = require("./models/User")
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/user", require("./routes/userRoute"))
app.use("/post", require("./routes/postRoute"))
app.use("/chat", require("./routes/chatRoutes"))
app.use("*", (req, res) => {
    res.status(400).json({
        message: "404:resourse you are lokking for is not available"
    })
})
const PORT = process.env.PORT || 5000

mongoose.connection.once("open", () => {
    app.listen(PORT, console.log(`SEVER RUNNING http://localhost:${PORT} `))
    console.log("mongo connected");
})

mongoose.connection.on("error", err => {
    const msg = `${format(new Date(), "dd-MM-yyyy \t HH:mm:ss")}\t${err.code}\t${err.name}`
    logEvent({
        fileName: "mongo.log",
        message: msg
    })
})