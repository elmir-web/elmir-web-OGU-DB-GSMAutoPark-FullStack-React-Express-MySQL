import { useState, useEffect } from "react";

import moment from "moment";

import "./Sheets.scss";

function Sheets({ funcRequest }) {
  let [allSheets, setSheets] = useState([]);
  let [allAutoGarages, setAutoGarages] = useState([]);
  let [allWorkers, setWorkers] = useState([]);
  let [changedSheet, setChangedSheet] = useState(null);
  let [inputObjectSheet, setInputObjectSheet] = useState({
    ID: null,
    NumberSheet: null,
    DateSheet: moment(new Date()).format("YYYY-MM-DD"),
    IDgarage: null,
    IDsigner: null,
  });
  let [createSheet, setCreateSheet] = useState(null);

  useEffect(loadSheets, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadSheets() {
    const sheets = await funcRequest(`http://localhost:8080/api/sheet/`);

    setSheets(sheets);

    const autoGarages = await funcRequest(
      `http://localhost:8080/api/autogarage/`
    );

    setAutoGarages(autoGarages);

    let workers = await funcRequest(`http://localhost:8080/api/worker/`);

    workers = workers.filter((worker) => {
      return worker.Function === 2;
    });

    setWorkers(workers);
  }

  async function deleteSheet(sheet) {
    const message = await funcRequest(
      `http://localhost:8080/api/sheet/${sheet.ID}`,
      "DELETE"
    );

    window.alert(message);

    loadSheets();
  }

  async function beginUpdateSheet(sheet = null) {
    if (changedSheet === null && sheet !== null) {
      setChangedSheet(sheet);

      setInputObjectSheet({
        ID: null,
        NumberSheet: null,
        DateSheet: moment(new Date()).format("YYYY-MM-DD"),
        IDgarage: null,
        IDsigner: null,
      });
    } else if (
      changedSheet !== null &&
      sheet !== null &&
      changedSheet !== sheet
    ) {
      setChangedSheet(sheet);

      setInputObjectSheet({
        ID: null,
        NumberSheet: null,
        DateSheet: moment(new Date()).format("YYYY-MM-DD"),
        IDgarage: null,
        IDsigner: null,
      });
    } else {
      setChangedSheet(null);
    }
  }

  return (
    <div className="Sheets">
      <h4>Ведомости</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID ведомости</th>
              <th>Номер ведомости</th>
              <th>Дата ведомости</th>
              <th>Гараж (ID)</th>
              <th>Подписант (ID)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {allSheets.length ? (
              allSheets.map((sheet) => {
                return (
                  <tr key={sheet.ID}>
                    <td>{sheet.ID}</td>
                    <td>{sheet.NumberSheet}</td>
                    <td>{sheet.DateSheet}</td>
                    <td>
                      {sheet.IDgarage.Name} ({sheet.IDgarage.ID})
                    </td>
                    <td>
                      {sheet.IDsigner.FIO} ({sheet.IDsigner.ID})
                    </td>
                    <td>
                      <button
                        className="button-table"
                        onClick={() => {
                          deleteSheet(sheet);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-table"
                        onClick={() => {
                          beginUpdateSheet(sheet);
                        }}
                      >
                        Изменить
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colspan="6">Ведомости не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*  */}

      <div className="changed-wrapper">
        {changedSheet !== null ? (
          <div>
            <h4>
              Редактирование ведомости {changedSheet.NumberSheet}:
              {changedSheet.DateSheet}
            </h4>

            <input
              type="text"
              className="input-write"
              onChange={(e) => {
                setInputObjectSheet({
                  ...inputObjectSheet,
                  ID: changedSheet.ID,
                  NumberSheet: e.target.value,
                });
              }}
              placeholder="Введите номер ведомости"
            />

            <input
              type="date"
              className="input-write"
              value={inputObjectSheet.DateSheet}
              onChange={(e) => {
                setInputObjectSheet({
                  ...inputObjectSheet,
                  ID: changedSheet.ID,
                  DateSheet: e.target.value,
                });
              }}
            />

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите гараж") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }
                let tempAutoGarage = e.target.value;

                let tempThisSheet = {
                  ...inputObjectSheet,
                  ID: changedSheet.ID,
                  IDgarage: tempAutoGarage,
                };

                setInputObjectSheet(tempThisSheet);
              }}
            >
              <option>Выберите гараж</option>
              {allAutoGarages.map((autogarage) => {
                return (
                  <option key={autogarage.ID} value={autogarage.ID}>
                    {autogarage.Name}
                  </option>
                );
              })}
            </select>

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите подписанта") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }

                let tempThisSheet = {
                  ...inputObjectSheet,
                  ID: changedSheet.ID,
                  IDsigner: e.target.value,
                };

                setInputObjectSheet(tempThisSheet);
              }}
            >
              <option>Выберите подписанта</option>
              {allWorkers.map((worker) => {
                return (
                  <option key={worker.ID} value={worker.ID}>
                    {worker.FIO}
                  </option>
                );
              })}
            </select>

            <button
              className="button-modify"
              onClick={async () => {
                const message = await funcRequest(
                  `http://localhost:8080/api/sheet/`,
                  `PUT`,
                  inputObjectSheet
                );

                setChangedSheet(null);
                setInputObjectSheet({
                  ID: null,
                  NumberSheet: null,
                  DateSheet: moment(new Date()).format("YYYY-MM-DD"),
                  IDgarage: null,
                  IDsigner: null,
                });

                window.alert(message);

                loadSheets();
              }}
            >
              Изменить
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="created-wrapper">
        <h4>
          Создать ведомость{" "}
          {createSheet !== null ? ` - Номер: ${createSheet.NumberSheet}` : ""}
        </h4>

        <input
          type="text"
          className="input-write"
          onChange={(e) => {
            setCreateSheet({
              ...createSheet,
              NumberSheet: e.target.value,
            });
          }}
          placeholder="Введите номер ведомости"
        />

        <input
          type="date"
          className="input-write"
          onChange={(e) => {
            setCreateSheet({
              ...createSheet,
              DateSheet: e.target.value,
            });
          }}
        />

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите гараж") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }

            let tempAutoGarage = e.target.value;

            let tempThisSheet = {
              ...createSheet,
              IDgarage: tempAutoGarage,
            };

            setCreateSheet(tempThisSheet);
          }}
        >
          <option>Выберите гараж</option>
          {allAutoGarages.map((autogarage) => {
            return (
              <option key={autogarage.ID} value={autogarage.ID}>
                {autogarage.Name}
              </option>
            );
          })}
        </select>

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите подписанта") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }

            let tempWorkerID = e.target.value;

            let tempThisSheet = {
              ...createSheet,
              IDsigner: tempWorkerID,
            };

            setCreateSheet(tempThisSheet);
          }}
        >
          <option>Выберите подписанта</option>
          {allWorkers.map((worker) => {
            return (
              <option key={worker.ID} value={worker.ID}>
                {worker.FIO}
              </option>
            );
          })}
        </select>

        <button
          className="button-modify"
          onClick={async () => {
            const message = await funcRequest(
              `http://localhost:8080/api/sheet/`,
              "POST",
              createSheet
            );

            setCreateSheet(null);

            window.alert(message);

            loadSheets();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default Sheets;
