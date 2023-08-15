import express from "express"
const app = express();
const port = 5000;


app.use(express.static("static"));


app.get("/", (req, res) => {
  res.json({message:"Hello world"})
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});