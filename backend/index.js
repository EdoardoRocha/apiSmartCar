require("dotenv").config();

const express = require("express");
const app = express();
const consign = require("consign");
const port = process.env.PORT || 3000;
const db = require("./config/db.js");

app.db = db;

consign()
  .include("config/middlewares.js")
  .then("api")
  .then("config/swagger.js")
  .then("config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log("Servidor rodando na porta... " + port);
});
