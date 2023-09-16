const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require('body-parser')
const { Server } = require("socket.io")
dotenv.config()
const app = express()

/* data base connection */
require("./model/db").connectDB()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded())

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/auth", require("./routes/AuthRoutes"))
app.use("/api/message", require("./routes/MessageRoutes"))


const server = app.listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})
global.onlineUser = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log("add-user call");
        onlineUser.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUser.get(data.to)
        console.log(data,"data");
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",{
                from:data.from,
                message:data.message
            })
        }
    })
})
