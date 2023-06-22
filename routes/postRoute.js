const express = require("express")
const { addPost, getPost, deletePost } = require("../controllers/postController")
const router = express.Router()
const { protected } = require("../middleware/loginOnly")

router
    .post('/addpost', protected, addPost)
    .get('/getpost', protected, getPost)
    .delete('/deletepost/:postId', deletePost)

module.exports = router