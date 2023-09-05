import express from "express"
import router from "./routes";
import * as dotenv from "dotenv";
import { protect } from "./modules/auth";
import cors from "cors";
import morgan from "morgan"
import { createNewUser, getAllUser, getUser, signin, updateStatus, updateUser } from "./handlers/user";
import {Server} from "socket.io";
import config from "./config";



dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))




app.use(express.static("static"));

app.get('/users',getAllUser)
app.get('/users/:id',getUser)
app.post('/user',createNewUser)
app.post('/signin',signin)
app.put('/updateprofile/:id',updateUser)
app.put('/updatestatus/:id',updateStatus)


app.use('/api', protect, router)

const server = app.listen(config.port, () => {
  console.log(`Server is listening at http://localhost:${config.port}`);
});
const io = new Server(server,{
  cors: {
    origin: "*",
    credentials: true,
  },
});


let users = [];
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });


  socket.emit("me", socket.id)



  socket.on('newUser', (data) => {
    const isIdIncluded = users.some(obj => obj.id === data.id);
    if(!isIdIncluded){
      users.push(data);
    }

    io.emit('newUserResponse', users);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));


  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  socket.on("send-emoji", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("emoji-recieve", data.msg);
    }
  });



  socket.on("del-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("del-recieve", data.id);
    }
  });
  socket.on("edit-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("edit-recieve", data);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });

  




});



