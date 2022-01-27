let axios = require("axios");

// методы (контроллеры)
class AutoGarageController {
  // создать авто гараж
  async createAutoGarage(req, res) {
    const { Name, IDbase } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO garage (Name, IDbase) VALUES ('${Name}', '${IDbase}')`
    );

    res.json(`Гараж (название: "${Name}", ID автобазы: "${IDbase}") создан.`);
  }

  // вернуть все авто гаражи
  async getAutoGarage(req, res) {
    let [rowsAllAutoGarages] = await global.connectMySQL.execute(
      `SELECT * FROM garage`
    );

    for (let index = 0; index < rowsAllAutoGarages.length; index++) {
      rowsAllAutoGarages[index].IDbase = await global.funcRequest(
        `/api/autobase/${rowsAllAutoGarages[index].IDbase}`
      );
    }

    res.json(rowsAllAutoGarages);
  }

  // вернуть один авто гараж
  async getOneAutoGarage(req, res) {
    const idGarage = req.params.id;

    let [rowsAllAutoGarages] = await global.connectMySQL.execute(
      `SELECT * FROM garage WHERE ID = ${idGarage}`
    );

    rowsAllAutoGarages[0].IDbase = await global.funcRequest(
      `/api/autobase/${rowsAllAutoGarages[0].IDbase}`
    );

    res.json(rowsAllAutoGarages[0]);
  }

  // изменить авто гараж
  async updateAutoGarage(req, res) {
    const { ID, Name, IDbase } = req.body;

    const [rowsUpdatedAutoGarage] = await global.connectMySQL.execute(
      `UPDATE garage SET Name = '${Name}', IDbase = '${IDbase}' WHERE ID = ${ID}`
    );
    if (rowsUpdatedAutoGarage["affectedRows"])
      res.json(
        `Гараж (ID: ${ID} Название: ${Name} ID автобазы: ${IDbase}) изменен`
      );
    else res.json(`Гараж с ID: ${ID} не изменен`);
  }

  // удалить авто гараж
  async deleteAutoGarage(req, res) {
    const idGarage = req.params.id;

    let [checkCarForGarage] = await global.connectMySQL.execute(
      `SELECT * FROM car WHERE IDgarage = ${idGarage}`
    );

    if (checkCarForGarage.length) {
      res.json(`Нельзя удалить гараж, потому что у него есть автомобили`);
    } else {
      let [checkSheetsForGarage] = await global.connectMySQL.execute(
        `SELECT * FROM sheet WHERE IDgarage = ${idGarage}`
      );

      if (checkSheetsForGarage.length) {
        res.json(`Нельзя удалить гараж, потому что у него есть ведомости`);
      } else {
        let [rowsDeletedGarage] = await global.connectMySQL.execute(
          `DELETE FROM garage WHERE ID = ${idGarage}`
        );

        if (rowsDeletedGarage["affectedRows"])
          res.json(`Гараж с ID: ${idGarage} успешно удален`);
        else res.json(`Удалить гараж с ID: ${idGarage} не получилось`);
      }
    }
  }
}

module.exports = new AutoGarageController();
