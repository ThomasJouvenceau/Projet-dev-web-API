const express = require("express");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const arbitreRouter = require("./routes/arbitre");
const matchRouter = require("./routes/match");
const equipeRouter = require("./routes/equipe");

const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
  response.send("Bienvenue dans notre API");
});

app.use(userRouter); 
app.use(equipeRouter); 
app.use(adminRouter); 
app.use(arbitreRouter);
app.use(matchRouter);
app.use(require("./routes/Secure"));

app.listen(process.env.PORT, () =>
    console.log("Server listening on port " + process.env.PORT)
  );