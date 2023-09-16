

const express = require('express')
const { sendMessage, getMessage } = require('../controllers/MessageController')
const router = express.Router()
require('dotenv').config()
router.post("/send-message", sendMessage)
router.get("/get-message/:from/:to", getMessage)
module.exports = router
