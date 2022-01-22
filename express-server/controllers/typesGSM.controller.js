// методы (контроллеры)
class TypesGSMController {
  // создать тип ГСМ
  async createTypeGSM(req, res) {
    const { Name, ForKilo } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO gsm (Name, ForKilo) VALUES ('${Name}', '${ForKilo}')`
    );

    res.json(`Вид ГСМ (название: "${Name}", вес: "${ForKilo}") создан.`);
  }

  // вернуть все типы ГСМ
  async getTypesGSM(req, res) {
    let [rowsAllGSM] = await global.connectMySQL.execute(`SELECT * FROM gsm`);

    res.json(rowsAllGSM);
  }

  // вернуть один тип ГСМ
  async getOneTypeGSM(req, res) {
    const idGSM = req.params.id;

    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM gsm WHERE ID = ${idGSM}`
    );

    res.json(rowsAllAutoBase[0]);
  }

  // изменить тип ГСМ
  async updateTypeGSM(req, res) {
    const { ID, Name, ForKilo } = req.body;

    const [rowsUpdatedAutoBase] = await global.connectMySQL.execute(
      `UPDATE gsm SET Name = '${Name}', ForKilo = '${ForKilo}' WHERE ID = ${ID}`
    );
    if (rowsUpdatedAutoBase["affectedRows"])
      res.json(`ГСМ с ID: ${ID} изменен. Название: ${Name}, вес: ${ForKilo}`);
    else res.json(`Изменить ГСМ с ID: ${ID} не получилось`);
  }

  // удалить тип ГСМ
  async deleteTypeGSM(req, res) {
    const idGSM = req.params.id;

    let [checkRecordsForGSM] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDgsm = ${idGSM}`
    );

    if (checkRecordsForGSM.length) {
      res.json(
        `Нельзя удалить вид ГСМ базу, у него есть связанные путевые листы`
      );
    } else {
      let [rowsDeletedGSM] = await global.connectMySQL.execute(
        `DELETE FROM gsm WHERE ID = ${idGSM}`
      );

      if (rowsDeletedGSM["affectedRows"])
        res.json(`Вид ГСМ с ID: ${idGSM} успешно удален`);
      else res.json(`Удалить вид ГСМ с ID: ${idGSM} не получилось`);
    }
  }
}

module.exports = new TypesGSMController();
