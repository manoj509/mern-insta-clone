const mongoose = require("mongoose")

const chatShema = mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model("chat", chatShema)