const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        mongoose.connect(process.env.DBURL)
        console.log("db connected");
    }
    catch (err) {
        console.log(error, "db err");
    }
}



