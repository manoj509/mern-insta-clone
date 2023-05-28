const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        cb(null, "public")
    }
})
exports.postUpload = multer({ storage }).array("image")