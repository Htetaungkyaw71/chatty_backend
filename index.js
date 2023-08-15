const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.json({message:"Hello world"})
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});