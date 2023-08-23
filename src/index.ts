import express from "express"
import router from "./routes";
import * as dotenv from "dotenv";
import { protect } from "./modules/auth";
import cors from "cors";
import morgan from "morgan"
import { createNewUser, getAllUser, getUser, signin, updateUser } from "./handlers/user";
import { getAllContact } from "./handlers/contact";
import {Server} from "socket.io";



dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
const port = 5000;



app.use(express.static("static"));

app.get('/users',getAllUser)
app.get('/users/:id',getUser)
app.post('/user',createNewUser)
app.post('/signin',signin)
app.put('/updateprofile/:id',updateUser)


app.use('/api', protect, router)

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
const io = new Server(server,{
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data)
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});


// {
//   "data": {
//     "id": "a5643620-0f2b-4395-aa9f-4ac53afadb2c",
//     "createdAt": "2023-08-16T11:25:26.091Z",
//     "name": "min",
//     "email": "min@gmail.com",
//     "password": "$2b$05$AYzdi3CrGVPPqYD.Sy8xTOy2PTv1UCflQ1Bkj5xkMwuLIWZgnZwpK",
//     "isAvater": false,
//     "avater": "",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1NjQzNjIwLTBmMmItNDM5NS1hYTlmLTRhYzUzYWZhZGIyYyIsImVtYWlsIjoibWluQGdtYWlsLmNvbSIsImlhdCI6MTY5MjE4NTEyNn0.g2lXn1AD2dvvhzLqy1JmPL5YPVnKmU9QZBaWWC-M8aw"
//   }
// }