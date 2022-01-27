// методы (контроллеры)
class ReportController {
  async getGSMDayGarage(req, res) {
    let tempSheets = await global.funcRequest(`/api/sheet/`);

    for (let index = 0; index < tempSheets.length; index++) {
      delete tempSheets[index].ID;
      delete tempSheets[index].NumberSheet;
      delete tempSheets[index].IDgarage;
      delete tempSheets[index].IDsigner;

      tempSheets[index] = tempSheets[index].DateSheet;
    }

    let returnJSON = { Dates: [...tempSheets] };

    let tempGarages = await global.funcRequest(`/api/autogarage/`);

    for (let index = 0; index < tempGarages.length; index++) {
      delete tempGarages[index].IDbase;
    }

    returnJSON = { ...returnJSON, Garages: tempGarages };

    res.json(returnJSON);
  }

  async getSheetsToGarage(req, res) {
    const idGarage = Number(req.params.id);

    let tempSheets = await global.funcRequest(`/api/sheet/`);

    let newSheets = [];

    for (let index = 0; index < tempSheets.length; index++) {
      if (tempSheets[index].IDgarage.ID === idGarage) {
        newSheets.push(tempSheets[index]);
      }
    }

    res.json(newSheets);
  }

  async getReport(req, res) {
    const { garageID, date } = req.body;

    const [requestReportRows] = await global.connectMySQL
      .execute(`SELECT garage.Name, gsm.Name, SUM(record.Liter) as Liter, SUM(record.Liter)*ForKilo as Kilo
    FROM gsm
    INNER JOIN record ON gsm.ID = record.IDgsm
    INNER JOIN sheet ON sheet.ID = record.IDsheet
    INNER JOIN garage ON garage.ID = sheet.IDgarage
    WHERE sheet.DateSheet = '${date}'
    and garage.ID = ${garageID}
    GROUP BY garage.Name, gsm.Name`);

    res.json(requestReportRows);
  }

  async sheetReport(req, res) {
    const idSheet = req.params.id;

    let reqArraySheetInfo = [];

    const [requestReportHeaderRows] = await global.connectMySQL.execute(`SELECT
    base.Name,
    garage.Name,
    sheet.NumberSheet,
    sheet.DateSheet,
    worker.FIO
    FROM
    sheet
    INNER JOIN garage ON garage.ID = sheet.IDgarage
    INNER JOIN base ON base.ID = garage.IDbase
    INNER JOIN worker ON base.ID = worker.IDbase and worker.ID = sheet.IDsigner
    where sheet.ID = ${idSheet}`);

    reqArraySheetInfo.push(requestReportHeaderRows);

    const [requestReportBodyRows] = await global.connectMySQL.execute(`SELECT
    car.Model,
    car.Number,
    record.NumberPL,
    worker.FIO,
    gsm.Name,
    record.Liter
    FROM
    sheet
    INNER JOIN record ON record.IDsheet = sheet.ID
    INNER JOIN car ON car.ID = record.IDcar
    INNER JOIN gsm ON gsm.ID = record.IDgsm
    INNER JOIN worker ON worker.ID = record.IDdriver
    WHERE
    sheet.ID = ${idSheet}`);

    reqArraySheetInfo.push(requestReportBodyRows);

    res.json(reqArraySheetInfo);
  }

  // async deleteRecord(req, res) {}
}

module.exports = new ReportController();
