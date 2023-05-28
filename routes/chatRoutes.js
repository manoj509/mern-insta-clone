const express = require("express")
const { accessChat } = require("../controllers/chatController")

const router = express.Router()

router
.post("/accesschat",accessChat)
// .get("/fetchchat",fetchChat)
// .post("/groupchat",createGroupChat)
// .put("/rename",renameGroup)
// .put("/remove",removeGroup)
// .put("/groupadd",addToGroup)

module.exports = router