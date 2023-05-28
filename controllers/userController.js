const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
exports.registerUser = async (req, res) => {
    try {
        const { name, userName, email, mobileNo, password } = req.body
        if (!name || !userName || !email || !mobileNo || !password) {
            throw new Error("All feilds required")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const found = await User.findOne({ $or: [{ email }, { userName }] })
        console.log(found)
        if (found) {
            throw new Error("user alredy exit")
        }

        const result = await User.create({ name, email, mobileNo, userName, password: hashPassword })
        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)
        res.json({
            message: "User register Successfully",
            result: {
                id: result._id,
                name: result.name,
                email: result.email,
                userName: result.userName,
                password: result.password,
                token
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "unable to register" + error
        })
    }
}

exports.getAllregisterUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.json({
            message: "user fetched successfulyy",
            result
        })
    } catch (error) {
        res.json({
            message: "unable to fetch " + error.message
        })

    }
}

exports.loginUser = async (req, res) => {
    try {
        if ((!req.body.email && !req.body.userName) || !req.body.password) {
            return res.status(400).json({
                message: `All feilds required`
            })
        }

        const result = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] }).lean()
        if (!result) {
            return res.status(400).json({
                message: `${req.body.email} || ${req.body.userName} is not registered with us`
            })
        }
        const compare = await bcrypt.compare(req.body.password, result.password)
        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

        if (!compare) {
            return res.status(400).json({
                message: `Invalid password`
            })
        }
        // const token = jwt.sign({
        //     name: result.name,
        //     id: result._id,
        // }, "JWT_PASSWORD")
        res.json({
            message: "user login success",
            result: {
                ...result, token
            }
        })
    } catch (error) {
        res.json({
            message: "something went wrong" + error.message,
        })
    }
}
exports.destroyUsers = async (req, res) => {
    try {
        const result = await User.deleteMany()
        res.json({
            message: "user Data destroyed",
            result
        })
    } catch (error) {
        res.json({
            message: "something went wrong" + error.message,
        })
    }
}

exports.allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        // console.log(keyword)
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    }
        : {};
    const users = await User.find(keyword)
    res.send(users)
})