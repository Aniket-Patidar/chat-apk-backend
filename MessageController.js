const Message = require("../model/messageModel")

exports.sendMessage = async (req, res, next) => {
    try {
        const { message, to, from } = req.body;
        const getUser = onlineUser.get(to);
        if (!message && !from && !to) return res.status(201).send({ message: "please enter data" });
        if (message && from && to) {
            const newMessage = await Message.create({
                message: message,
                receiver: to,
                sender: from,
                messageStatus: getUser ? "delivered" : "send",
                include: { sender: true, receiver: true }
            })
            await newMessage.save()
            return res.status(201).send({ message: newMessage });
        }
    } catch (err) {
        next(err)
    }
}


/* need to find why to filter schema and update Read */
exports.getMessage = async (req, res, next) => {
    const { from, to } = req.params;
    const messages1 = await Message.find({ receiver: to, sender: from }).populate("sender").populate("receiver")
    const messages2 = await Message.find({ receiver: from, sender: to }).populate("sender").populate("receiver")
    let msg = messages1.concat(messages2);
    const unreadMessage = [];
    msg.forEach((messages, index) => {
        if (messages.messageStatus !== "read" && messages.sender._id == to) {
            msg[index].messageStatus = "read";
            unreadMessage.push(messages)
        }
    })
    return res.status(201).send({ messages: msg });
}