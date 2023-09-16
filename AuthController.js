
const { json } = require("express");
const User = require("../model/userModel");

exports.getUser = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.json({ msg: "please enter email id", status: false })
        }
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({ msg: "user not found", status: false })
        }
        return res.json({ msg: "user found", status: true, data: user })
    } catch (err) {
        next(err)
    }
}

exports.uploadImg = async (req, res) => {
    res.json({ data: req.file, success: true })
}

exports.signUp = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.json({ status: false, msg: "please enter email" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ status: false, msg: "user already exist" })
        }
        const newUser = await User(req.body)
        await newUser.save()
        return res.json({ status: true, msg: "user created or Register" })
    } catch (err) {
        console.log(err)
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        var Array = {};
        users.forEach((user) => {
            const fl = user.name.charAt(0).toUpperCase();
            if (!Array[fl]) {
                Array[fl] = [];
            }
            Array[fl].push(user)
        })
        console.log(Array);
        return  await res.status(200).json({status:true,users:Array})
    } catch (err) {
        next(err)
    }

}