const express = require("express");
const userRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
  response.send("Bienvenue dans notre API");
});

app.use(userRouter); 
app.use(teamRouter); 
app.use(adminRouter); 
app.use(arbitreRouter);

app.listen(process.env.PORT, () =>
    console.log("Server listening on port " + process.env.PORT)
  );