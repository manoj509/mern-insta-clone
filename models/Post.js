const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    caption: {
        type: String,
    },
    image: {
        type: [String],
        required: [true, "image is Required"]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"user"
    }
}, { timestamps: true })

module.exports = mongoose.model("post", postSchema)