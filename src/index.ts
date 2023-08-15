import express from "express"
import router from "./routes";


const app = express();
const port = 5000;


app.use(express.static("static"));


app.get("/", (req, res) => {
  res.json({message:"Hello world"})
});

app.use('/api',router)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});