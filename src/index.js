const express = require("express");
const userRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
  response.send("Hello world !!");
});