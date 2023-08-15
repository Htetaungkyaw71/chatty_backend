import express from "express"
import router from "./routes";
import * as dotenv from "dotenv";
import { protect } from "./modules/auth";
import morgan from "morgan"
import { createNewUser, signin } from "./handlers/user";



dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
const port = 5000;



app.use(express.static("static"));


app.post('/user',createNewUser)
app.post('/signin',signin)

app.use('/api', protect, router)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});