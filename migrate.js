const connection = require("./src/models/db");
require("./src/models/user");
require("./src/models/equipe");
require("./src/models/arbitre");
require("./src/models/admin");
require("./src/models/match");
connection
  .sync({
    alter: true,
  })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());