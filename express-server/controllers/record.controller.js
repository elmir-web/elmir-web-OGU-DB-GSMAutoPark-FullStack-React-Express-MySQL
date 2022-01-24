// методы (контроллеры)
class RecordController {
  async createRecord(req, res) {
    const { IDsheet, IDcar, IDdriver, NumberPL, IDgsm, Liter } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO record(IDsheet, IDcar, IDdriver, NumberPL, IDgsm, Liter) values('${IDsheet}', '${IDcar}', '${IDdriver}', '${NumberPL}', '${IDgsm}', '${Liter}')`
    );

    res.json(
      `Путевой лист (ID ведомости: "${IDsheet}", ID автомобиля: "${IDcar}", ID водителя: "${IDdriver}", Номер: "${NumberPL}", ID ГСМ "${IDgsm}", Литры: "${Liter}") создан.`
    );
  }

  async getRecords(req, res) {
    let [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM record`
    );

    for (let index = 0; index < rowsAllRecords.length; index++) {
      rowsAllRecords[index].IDsheet = await global.funcRequest(
        `http://localhost:8080/api/sheet/${rowsAllRecords[index].IDsheet}`
      );

      rowsAllRecords[index].IDcar = await global.funcRequest(
        `http://localhost:8080/api/vehicle/${rowsAllRecords[index].IDcar}`
      );

      rowsAllRecords[index].IDdriver = await global.funcRequest(
        `http://localhost:8080/api/worker/${rowsAllRecords[index].IDdriver}`
      );

      rowsAllRecords[index].IDgsm = await global.funcRequest(
        `http://localhost:8080/api/type-gsm/${rowsAllRecords[index].IDgsm}`
      );
    }

    res.json(rowsAllRecords);
  }

  async getOneRecord(req, res) {
    const idRecord = req.params.id;

    let [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE ID = ${idRecord}`
    );

    rowsAllRecords[0].IDsheet = await global.funcRequest(
      `http://localhost:8080/api/sheet/${rowsAllRecords[0].IDsheet}`
    );

    rowsAllRecords[0].IDcar = await global.funcRequest(
      `http://localhost:8080/api/vehicle/${rowsAllRecords[0].IDcar}`
    );

    rowsAllRecords[0].IDdriver = await global.funcRequest(
      `http://localhost:8080/api/worker/${rowsAllRecords[0].IDdriver}`
    );

    rowsAllRecords[0].IDgsm = await global.funcRequest(
      `http://localhost:8080/api/type-gsm/${rowsAllRecords[0].IDgsm}`
    );

    res.json(rowsAllRecords[0]);
  }

  async updateRecord(req, res) {
    const { ID, IDsheet, IDcar, IDdriver, NumberPL, IDgsm, Liter } = req.body;

    const [rowsUpdatedRecord] = await global.connectMySQL.execute(
      `UPDATE record SET IDsheet = '${IDsheet}', IDcar = '${IDcar}', IDdriver = '${IDdriver}', NumberPL = '${NumberPL}', IDgsm = '${IDgsm}', Liter = '${Liter}' WHERE ID = '${ID}'`
    );

    if (rowsUpdatedRecord["affectedRows"])
      res.json(
        `Путевой лист (ID: ${ID} ID ведомости: "${IDsheet}", ID автомобиля: "${IDcar}", ID водителя: "${IDdriver}", Номер путевого листа: "${NumberPL}", ID ГСМ: "${IDgsm}", Литры: "${Liter}") изменен`
      );
    else res.json(`Путеовой лист с ID: ${ID} не изменен`);
  }

  async deleteRecord(req, res) {
    const idRecord = req.params.id;

    let [rowsDeletedRecord] = await global.connectMySQL.execute(
      `DELETE FROM record WHERE ID = ${idRecord}`
    );

    if (rowsDeletedRecord["affectedRows"])
      res.json(`Путевой лист с ID: ${idRecord} успешно удален`);
    else res.json(`Удалить путевой лист с ID: ${idRecord} не получилось`);
  }
}

module.exports = new RecordController();
