const express = require("express");
const mysql = require("mysql2/promise");
let cors = require("cors");
require("dotenv").config();
let axios = require("axios");

const PORT = process.env.PORT || 8080;
const app = express();

const autoBaseRouter = require("./routes/autobase.router");
const typesGSMrouter = require("./routes/typesGSM.router");
const autoGarageRouter = require("./routes/autoGarageRouter");
const vehicleRouter = require("./routes/vehicle.router");
const workersRouter = require("./routes/worker.router");
const sheetRouter = require("./routes/sheet.router");
const recordRouter = require("./routes/record.router");

global.funcRequest = async (url, method = "GET", data = null) => {
  try {
    let response;

    if (method === "GET") {
      response = await axios.get(url);
    }

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  return 554;
};

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
app.use("/api", autoGarageRouter);
app.use("/api", vehicleRouter);
app.use("/api", workersRouter);
app.use("/api", sheetRouter);
app.use("/api", recordRouter);
