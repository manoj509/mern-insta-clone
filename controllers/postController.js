const Post = require("../models/Post")
const jwt = require("jsonwebtoken")
const { postUpload } = require("../middleware/upload")
const User = require("../models/User")

exports.addPost = async (req, res) => {
    try {
        postUpload(req, res, async (err) => {
            const { id } = jwt.verify(req.headers.authorization, process.env.JWT_KEY)
            const { title, userId, caption } = req.body
            console.log(req.body.userId, "body");
            // if (!image || !userId) {
            //     return res.status(400).json({
            //         message: "All feilds required"
            //     })
            // }
            if (err) {
                // console.log(err);
                return req.status(400).json({
                    message: "multer error",
                    error: err
                })
            }
            // console.log(req.body);
            // console.log(req.files);
            const d = []
            for (let i = 0; i < req.files.length; i++) {
                d.push(`${req.files[i].filename}`)
            }
            req.body.userId = id
            console.log(id,"userid");
            const userData = await User.findOne({ id })
            console.log(userData,'userData');
            const result = await Post.create({
                ...req.body,
                userData,
                image: d
            })
            console.log(result,'result');
            res.json({
                message: "post addded",
                result
            })
        })

    } catch (error) {
        res.status(400).json({
            message: "ERROR" + error.message
        })
    }
}
exports.getPost = async (req, res) => {
    try {

        const result = await Post.find({ userId: req.body.userId })
        res.json({  
            message: "post Data fetch successfulyy",
            result
        })
    } catch (error) {
        res.json({
            message: error.message + "error"
        })

    }
}
exports.deletePost = async (req, res) => {
    try {
            const {postId} = req.params
        const result = await Post.findByIdAndDelete(postId)
        res.json({
            message: "post deleted successfulyy",
            result
        })
    } catch (error) {
        res.json({
            message: error.message + "error"
        })

    }
}


