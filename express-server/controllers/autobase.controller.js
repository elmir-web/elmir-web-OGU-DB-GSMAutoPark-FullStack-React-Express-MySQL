// методы (контроллеры)
class AutoBaseController {
  // создать автобазу
  async createAutoBase(req, res) {
    const { Name } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO base (Name) VALUES ('${Name}')`
    );

    res.json(`Автомобильная база под названием "${Name}" успешно создана.`);
  }

  // вернуть все автобазы
  async getAutoBase(req, res) {
    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM base`
    );

    res.json(rowsAllAutoBase);
  }

  // вернуть одну автобазу
  async getOneAutoBase(req, res) {
    const idAutoBase = req.params.id;

    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM base WHERE ID = ${idAutoBase}`
    );

    res.json(rowsAllAutoBase[0]);
  }

  // изменить автобазу
  async updateAutoBase(req, res) {
    const { ID, Name } = req.body;

    const [rowsUpdatedAutoBase] = await global.connectMySQL.execute(
      `UPDATE base SET Name = '${Name}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedAutoBase["affectedRows"])
      res.json(`Автобаза с ID: ${ID} изменила название на: ${Name}`);
    else res.json(`Переименовать автобазу с ID: ${ID} не получилось`);
  }

  // удалить автобазу
  async deleteAutoBase(req, res) {
    const idAutoBase = req.params.id;

    let [checkGarageForBase] = await global.connectMySQL.execute(
      `SELECT * FROM garage WHERE IDBase = ${idAutoBase}`
    );

    if (checkGarageForBase.length) {
      res.json(`Нельзя удалить автомобильную базу, у неё есть гаражи`);
    } else {
      let [rowsDeletedAutoBased] = await global.connectMySQL.execute(
        `DELETE FROM base WHERE ID = ${idAutoBase}`
      );

      if (rowsDeletedAutoBased["affectedRows"])
        res.json(`Автобаза с ID: ${idAutoBase} успешна удалена`);
      else res.json(`Удалить автобазу с ID: ${idAutoBase} не получилось`);
    }
  }
}

module.exports = new AutoBaseController();
