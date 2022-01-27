const express = require("express");
const mysql = require("mysql2/promise");
let cors = require("cors");
require("dotenv").config();
let axios = require("axios");

const app = express();

const URL_THIS_SERVER = process.env.URL_SRV || `http://localhost`;
const PORT = process.env.PORT || 8080;
const config = require("./MySQLConfig.json");

const autoBaseRouter = require("./routes/autobase.router");
const typesGSMrouter = require("./routes/typesGSM.router");
const autoGarageRouter = require("./routes/autoGarageRouter");
const vehicleRouter = require("./routes/vehicle.router");
const workersRouter = require("./routes/worker.router");
const sheetRouter = require("./routes/sheet.router");
const recordRouter = require("./routes/record.router");
const reportRouter = require("./routes/report.router");

global.funcRequest = async (url, method = "GET", data = null) => {
  try {
    let response;

    if (method === "GET") {
      response = await axios.get(`${URL_THIS_SERVER}:${PORT}${url}`);
    }

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  return 554;
};

app.listen(PORT, async () => {
  global.connectMySQL = await mysql.createPool(config);

  let [test] = await global.connectMySQL.execute(`select * from gsm`);
  console.log(test);

  console.log(`Сервер запущен на порту ${PORT}`);
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
app.use("/api", reportRouter);
