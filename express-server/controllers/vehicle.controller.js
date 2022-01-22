let axios = require("axios");

class VehicleController {
  async createVehicle(req, res) {
    const { Model, Number, IDgarage } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO car (Model, Number, IDgarage) VALUES ('${Model}', '${Number}', '${IDgarage}')`
    );

    res.json(
      `Автомобиль (Модель: "${Model}", гос.номер: "${Number}", ID гаража: "${IDgarage}") создан.`
    );
  }

  async getVehicles(req, res) {
    let [rowsAllVeh] = await global.connectMySQL.execute(`SELECT * FROM car`);

    for (let index = 0; index < rowsAllVeh.length; index++) {
      rowsAllVeh[index].IDgarage = await global.funcRequest(
        `http://localhost:8080/api/autogarage/${rowsAllVeh[index].IDgarage}`
      );
    }

    res.json(rowsAllVeh);
  }

  async getOneVehicle(req, res) {
    const idVeh = req.params.id;

    let [rowsAllVeh] = await global.connectMySQL.execute(
      `SELECT * FROM car WHERE ID = ${idVeh}`
    );

    rowsAllVeh[0].IDgarage = await global.funcRequest(
      `http://localhost:8080/api/autogarage/${rowsAllVeh[0].IDgarage}`
    );

    res.json(rowsAllVeh[0]);
  }

  async updateVehicle(req, res) {
    const { ID, Model, Number, IDgarage } = req.body;

    const [rowsUpdatedVeh] = await global.connectMySQL.execute(
      `UPDATE car SET Model = '${Model}', Number = '${Number}', IDgarage = '${IDgarage}' WHERE ID = ${ID}`
    );
    if (rowsUpdatedVeh["affectedRows"])
      res.json(
        `Автомобиль (ID: "${ID}", Модель: "${Model}", гос.номер: "${Number}", ID гаража: "${IDgarage}") изменен`
      );
    else res.json(`Автомобиль с ID: ${ID} не изменен`);
  }

  async deleteVehicle(req, res) {
    const idVeh = req.params.id;

    let [checkRecordsForCar] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDcar = ${idVeh}`
    );

    if (checkRecordsForCar.length) {
      res.json(
        `Нельзя удалить автомобиль, потому что у него есть путевой лист`
      );
    } else {
      let [rowsDeletedVeh] = await global.connectMySQL.execute(
        `DELETE FROM car WHERE ID = ${idVeh}`
      );

      if (rowsDeletedVeh["affectedRows"])
        res.json(`Автомобиль с ID: ${idVeh} успешно удален`);
      else res.json(`Удалить автомобиль с ID: ${idVeh} не получилось`);
    }
  }
}

module.exports = new VehicleController();
