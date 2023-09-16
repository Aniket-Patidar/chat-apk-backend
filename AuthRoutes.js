const express = require('express')
const { getUser, uploadImg ,signUp, getAllUser} = require('../controllers/AuthController')
const User = require('../model/userModel')
const upload = require("../utils/multer")
const router = express.Router()
require('dotenv').config()

router.post("/user", getUser)
router.post("/uploadImg", upload.single('avatar'), uploadImg)
router.post("/signUp",signUp)
router.get("/getAllUser",getAllUser)
module.exports = router
