let axios = require("axios");
let moment = require("moment");

// методы (контроллеры)
class SheetController {
  async createSheet(req, res) {
    const { NumberSheet, DateSheet, IDgarage, IDsigner } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO sheet (NumberSheet, DateSheet, IDgarage, IDsigner) VALUES ('${NumberSheet}', '${DateSheet}', '${IDgarage}', '${IDsigner}')`
    );

    res.json(
      `Ведомость (Номер: "${NumberSheet}", Дата: "${DateSheet}", ID гаража: "${IDgarage}", ID подписанта: "${IDsigner}") создана.`
    );
  }

  async getSheets(req, res) {
    let [rowsAllSheets] = await global.connectMySQL.execute(
      `SELECT * FROM sheet`
    );

    for (let index = 0; index < rowsAllSheets.length; index++) {
      rowsAllSheets[index].DateSheet = moment(
        rowsAllSheets[index].DateSheet
      ).format("YYYY-MM-DD");

      rowsAllSheets[index].IDgarage = await global.funcRequest(
        `http://localhost:8080/api/autogarage/${rowsAllSheets[index].IDgarage}`
      );

      rowsAllSheets[index].IDsigner = await global.funcRequest(
        `http://localhost:8080/api/worker/${rowsAllSheets[index].IDsigner}`
      );
    }

    res.json(rowsAllSheets);
  }

  async getOneSheet(req, res) {
    const idSheet = req.params.id;

    let [rowsAllSheets] = await global.connectMySQL.execute(
      `SELECT * FROM sheet WHERE ID = ${idSheet}`
    );

    rowsAllSheets[0].DateSheet = moment(rowsAllSheets[0].DateSheet).format(
      "YYYY-MM-DD"
    );

    rowsAllSheets[0].IDgarage = await global.funcRequest(
      `http://localhost:8080/api/autogarage/${rowsAllSheets[0].IDgarage}`
    );

    rowsAllSheets[0].IDsigner = await global.funcRequest(
      `http://localhost:8080/api/worker/${rowsAllSheets[0].IDsigner}`
    );

    res.json(rowsAllSheets[0]);
  }

  async updateSheet(req, res) {
    const { ID, NumberSheet, DateSheet, IDgarage, IDsigner } = req.body;

    const [rowsUpdatedSheet] = await global.connectMySQL.execute(
      `UPDATE sheet SET NumberSheet = '${NumberSheet}', DateSheet = '${DateSheet}', IDgarage = '${IDgarage}', IDsigner = '${IDsigner}' WHERE ID = '${ID}'`
    );

    if (rowsUpdatedSheet["affectedRows"])
      res.json(
        `Ведомость (ID: ${ID} Номер: "${NumberSheet}", Дата: "${DateSheet}", ID гаража: "${IDgarage}", ID подписанта: "${IDsigner}") изменена`
      );
    else res.json(`Ведомость с ID: ${ID} не изменена`);
  }

  async deleteSheet(req, res) {
    const idSheet = req.params.id;

    let [checkRecordForSheet] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDsheet = ${idSheet}`
    );

    if (checkRecordForSheet.length) {
      res.json(
        `Нельзя удалить ведомость, потому что у него есть путевые листы`
      );
    } else {
      let [rowsDeletedSheet] = await global.connectMySQL.execute(
        `DELETE FROM sheet WHERE ID = ${idSheet}`
      );

      if (rowsDeletedSheet["affectedRows"])
        res.json(`Ведомость с ID: ${idSheet} успешно удалена`);
      else res.json(`Удалить ведомость с ID: ${idSheet} не получилось`);
    }
  }
}

module.exports = new SheetController();
