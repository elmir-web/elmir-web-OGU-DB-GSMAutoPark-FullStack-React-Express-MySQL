const express = require("express");
const mysql = require("mysql2/promise");
var cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

const autoBaseRouter = require("./routes/autobase.router");
const typesGSMrouter = require("./routes/typesGSM.router");

const config = {
  // elmir: mysql config
  host: "localhost",
  user: "root",
  database: "gsm",
  password: "root",
};

app.listen(PORT, async () => {
  global.connectMySQL = await mysql.createPool(config);

  console.log(`Сервер запущен по адресу: "http://localhost:${PORT}"`);
});

global.connectMySQL = null;

app.use(cors());
app.use(express.json());
app.use("/api", autoBaseRouter);
app.use("/api", typesGSMrouter);
