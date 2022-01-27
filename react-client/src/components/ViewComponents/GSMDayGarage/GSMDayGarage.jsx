import { useEffect, useState } from "react";

import "./GSMDayGarage.scss";

function GSMDayGarage({ funcRequest }) {
  let [allAutoGarages, setAutoGarages] = useState([]);
  let [garageSelected, setSelectGarage] = useState(null);
  let [divGarageHidden, setDivGarageHidden] = useState(false);
  let [sheetLoaded, setSheetLoaded] = useState(false);
  let [allSheetsToGarage, setSheetsToGarage] = useState([]);
  let [sheetSelected, setSelectSheet] = useState(null);
  let [divTableReport, setDivTableReport] = useState(false);
  let [reportGSM, setReportGSM] = useState([]);

  useEffect(loadComponent, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadComponent() {
    const autoGarages = await funcRequest(`/api/autogarage/`);

    setAutoGarages(autoGarages);
  }

  return (
    <div className="GSMDayGarage">
      <h4>ГСМ за день по гаражу</h4>
      <div>
        <h5>Отчет</h5>
        {garageSelected !== null ? (
          <h5>Выбрать гараж ID: {garageSelected}</h5>
        ) : (
          ""
        )}
        {sheetSelected !== null ? <h5>Дата выбрана: {sheetSelected}</h5> : ""}
      </div>
      {divGarageHidden === false ? (
        <div>
          <select
            className="input-select"
            size="1"
            onChange={(e) => {
              if (e.target.value === "Выберите гараж") {
                window.alert("Ошибка: Выберите варианты ниже");

                setSelectGarage(null);
                return;
              }

              setSelectGarage(e.target.value);
            }}
          >
            <option>Выберите гараж</option>
            {allAutoGarages.map((autobase) => {
              return (
                <option key={autobase.ID} value={autobase.ID}>
                  {autobase.Name}
                </option>
              );
            })}
          </select>

          <button
            className="button-modify"
            style={{ width: "100px" }}
            onClick={async (e) => {
              if (garageSelected === null) {
                window.alert("Ошибка: Гараж не выбран!");
                return true;
              }

              setDivGarageHidden(true);

              const sheets = await funcRequest(
                `/api/gsm-day-garage/get-sheet/${garageSelected}`
              );

              setSheetsToGarage(sheets);
              setSheetLoaded(true);
            }}
          >
            Установить
          </button>
        </div>
      ) : (
        ""
      )}
      {sheetLoaded === true ? (
        <div>
          <select
            className="input-select"
            size="1"
            onChange={(e) => {
              if (e.target.value === "Выберите дату") {
                window.alert("Ошибка: Выберите варианты ниже");

                setSelectSheet(null);
                return;
              }

              setSelectSheet(e.target.value);
            }}
          >
            <option>Выберите дату</option>
            {allSheetsToGarage.map((sheet) => {
              return (
                <option key={sheet.ID} value={sheet.DateSheet}>
                  {sheet.DateSheet}
                </option>
              );
            })}
          </select>
          <button
            className="button-modify"
            style={{ width: "100px" }}
            onClick={async () => {
              setSheetLoaded(false);
              setDivTableReport(true);

              const report = await funcRequest(
                `/api/gsm-day-garage/get-report`,
                "POST",
                { garageID: garageSelected, date: sheetSelected }
              );

              setReportGSM(report);
            }}
          >
            Установить
          </button>
        </div>
      ) : (
        ""
      )}

      {divTableReport === true ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Название ГСМ</th>
                <th>Литры</th>
                <th>Вес</th>
              </tr>
            </thead>
            {reportGSM.length ? (
              <tbody>
                {reportGSM.map((report, index) => {
                  return (
                    <tr key={index}>
                      <td>{report.Name}</td>
                      <td>{report.Liter}</td>
                      <td>{report.Kilo}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3">Данные не найдены</td>
                </tr>
              </tbody>
            )}
          </table>

          <button
            className="button-modify"
            style={{ width: "95%" }}
            onClick={() => {
              setSelectGarage(null);
              setDivGarageHidden(false);
              setSheetLoaded(false);
              setSheetsToGarage([]);
              setSelectSheet(null);
              setDivTableReport(false);
              setReportGSM([]);
            }}
          >
            Сбросить таблицу
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default GSMDayGarage;
