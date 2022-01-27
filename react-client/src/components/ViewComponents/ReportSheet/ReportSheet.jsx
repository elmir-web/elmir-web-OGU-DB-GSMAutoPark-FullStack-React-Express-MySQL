import { useEffect, useState } from "react";

import "./ReportSheet.scss";

function ReportSheet({ funcRequest }) {
  let [allSheets, setSheets] = useState([]);
  let [sheetSelected, setSheetSelected] = useState(null);
  let [divSheetHidden, setDivSheetHidden] = useState(false);
  let [sheetReport, setSheetReport] = useState([]);

  useEffect(loadComponent, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadComponent() {
    const sheets = await funcRequest(`/api/sheet/`);

    setSheets(sheets);
  }

  return (
    <div className="ReportSheet">
      <h4>Отчет по ведомостям</h4>

      {divSheetHidden === false ? (
        <div>
          <select
            className="input-select"
            size="1"
            onChange={(e) => {
              if (e.target.value === "Выберите ведомость") {
                window.alert("Ошибка: Выберите варианты ниже");
                return;
              }

              setSheetSelected(e.target.value);
            }}
          >
            <option>Выберите ведомость</option>
            {allSheets.map((sheet) => {
              return (
                <option key={sheet.ID} value={sheet.ID}>
                  {sheet.NumberSheet}
                </option>
              );
            })}
          </select>
          <button
            className="button-modify"
            style={{ width: "100px" }}
            onClick={async (e) => {
              if (sheetSelected === null) {
                window.alert("Ошибка: Ведомость не выбрана!");
                return true;
              }

              setDivSheetHidden(true);

              const report = await funcRequest(
                `/api/report-sheet/${sheetSelected}`
              );

              report[0].map((rep) => {
                console.log(rep);
              });

              setSheetReport(report);
            }}
          >
            Установить
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Гараж</th>
                <th>Номер ведомости</th>
                <th>Дата</th>
                <th>Подписант</th>
              </tr>
            </thead>
            <tbody>
              {sheetReport[0]?.map((rep, index) => {
                return (
                  <tr key={index}>
                    <td>{rep.Name}</td>
                    <td>{rep.NumberSheet}</td>
                    <td>{rep.DateSheet}</td>
                    <td>{rep.FIO}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <br />
          <br />
          <br />

          <table>
            <thead>
              <tr>
                <th>Автомобиль</th>
                <th>Номер</th>
                <th>Номер путевого листа</th>
                <th>Водитель</th>
                <th>ГСМ</th>
                <th>Литры</th>
              </tr>
            </thead>
            <tbody>
              {sheetReport[1]?.map((rep, index) => {
                return (
                  <tr key={index}>
                    <td>{rep.Model}</td>
                    <td>{rep.Number}</td>
                    <td>{rep.NumberPL}</td>
                    <td>{rep.FIO}</td>
                    <td>{rep.Name}</td>
                    <td>{rep.Liter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            className="button-modify"
            style={{ width: "95%" }}
            onClick={() => {
              setDivSheetHidden(false);
            }}
          >
            Сбросить таблицу
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportSheet;
