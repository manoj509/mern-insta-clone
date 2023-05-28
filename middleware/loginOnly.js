const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
exports.protected = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            message: "please provide token"
        })
    }
    // const tk = token.split(" ")[1]
    // console.log(tk, "tk");
    console.log(token);
    const { id } = jwt.verify(token, process.env.JWT_KEY)
    const result = await User.findById(id)

    console.log(result, "id");
    if (!result) {
        return res.status(401).json({
            message: "can not find this user"
        })
    }
    req.body.userId = id
    next()

})