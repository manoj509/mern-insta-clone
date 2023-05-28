
const asyncHandler = require("express-async-handler")
const Chat = require("../models/Chat")
exports.accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({
            message: "userId param not set with request"
        })
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req.user._id } }
            },
            {
                users: { $elemMatch: { $eq: userId } }
            }
        ]
    })
})