const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    type: String,
    message: {
        type: String
    },
    receiver: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    messageStatus: String,
    include: { sender: Boolean, receiver: Boolean }
}, { timestamps: true })


const Message = mongoose.model("message", MessageSchema)
module.exports = Message