let axios = require("axios");

// методы (контроллеры)
class WorkerController {
  async createWorker(req, res) {
    const { FIO, Function, IDbase } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO worker (FIO, worker.Function, IDbase) VALUES ('${FIO}', '${Function}', '${IDbase}')`
    );

    res.json(
      `Сотрудник (ФИО: "${FIO}", Номер должности: "${Function}", ID автобазы: "${IDbase}") создан.`
    );
  }

  async getWorkers(req, res) {
    let [rowsAllWorkers] = await global.connectMySQL.execute(
      `SELECT * FROM worker`
    );

    for (let index = 0; index < rowsAllWorkers.length; index++) {
      rowsAllWorkers[index].IDbase = await global.funcRequest(
        `/api/autobase/${rowsAllWorkers[index].IDbase}`
      );
    }

    res.json(rowsAllWorkers);
  }

  async getOneWoker(req, res) {
    const idWorker = req.params.id;

    let [rowsAllWorkers] = await global.connectMySQL.execute(
      `SELECT * FROM worker WHERE ID = ${idWorker}`
    );

    rowsAllWorkers[0].IDbase = await global.funcRequest(
      `/api/autobase/${rowsAllWorkers[0].IDbase}`
    );

    res.json(rowsAllWorkers[0]);
  }

  async updateWorker(req, res) {
    const { ID, FIO, Function, IDbase } = req.body;

    const [rowsUpdatedWorker] = await global.connectMySQL.execute(
      `UPDATE worker SET FIO = '${FIO}', worker.Function = '${Function}', IDbase = '${IDbase}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedWorker["affectedRows"])
      res.json(
        `Сотрудник (ID: ${ID} ФИО: "${FIO}", Номер должности: "${Function}", ID автобазы: "${IDbase}") изменен`
      );
    else res.json(`Гараж с ID: ${ID} не изменен`);
  }

  async deleteWorker(req, res) {
    const idWorker = req.params.id;

    let [checkRecordForWorker] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDdriver = ${idWorker}`
    );

    if (checkRecordForWorker.length) {
      res.json(
        `Нельзя удалить сотрудника, потому что у него есть путевой лист как водителя`
      );
    } else {
      let [checkSheetsForWorker] = await global.connectMySQL.execute(
        `SELECT * FROM sheet WHERE IDsigner = ${idWorker}`
      );

      if (checkSheetsForWorker.length) {
        res.json(
          `Нельзя удалить сотрудника, потому что у него есть ведомости как подписанта`
        );
      } else {
        let [rowsDeletedWorker] = await global.connectMySQL.execute(
          `DELETE FROM worker WHERE ID = ${idWorker}`
        );

        if (rowsDeletedWorker["affectedRows"])
          res.json(`Сотрудник с ID: ${idWorker} успешно удален`);
        else res.json(`Удалить сотрудника с ID: ${idWorker} не получилось`);
      }
    }
  }
}

module.exports = new WorkerController();
