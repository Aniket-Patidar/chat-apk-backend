const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: [true, "this email all ready exist"],
        required: [true, "please enter email"],
        // match:[],
    },
    avatar: {
        type: String,
        default:"/uploads/default_avatar.png",
    },
    dec: {
        type: String
    },

}, { timestamps: true })

const User = mongoose.model("user", UserSchema)
module.exports = User