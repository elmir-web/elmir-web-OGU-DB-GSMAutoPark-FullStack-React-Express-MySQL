import { useEffect, useState } from "react";

import "./Records.scss";

function Records({ funcRequest }) {
  let [allRecords, setRecords] = useState([]);
  let [changedRecord, setChangedRecord] = useState(null);
  let [inputObjectRecord, setInputObjectRecord] = useState({
    ID: null,
    IDsheet: null,
    IDcar: null,
    IDdriver: null,
    NumberPL: null,
    IDgsm: null,
    Liter: null,
  });
  let [allSheets, setSheets] = useState([]);
  let [allVehicles, setVehicles] = useState([]);
  let [allWorkers, setWorkers] = useState([]);
  let [allTypesGSM, setTypesGSM] = useState([]);
  let [createRecord, setCreateRecord] = useState(null);

  useEffect(loadRecords, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadRecords() {
    const records = await funcRequest(`http://localhost:8080/api/record/`);

    setRecords(records);

    const sheets = await funcRequest(`http://localhost:8080/api/sheet/`);

    setSheets(sheets);

    const vehicles = await funcRequest(`http://localhost:8080/api/vehicle/`);

    setVehicles(vehicles);

    let workers = await funcRequest(`http://localhost:8080/api/worker/`);

    workers = workers.filter((worker) => {
      return worker.Function === 1;
    });

    setWorkers(workers);

    const typesGSM = await funcRequest(`http://localhost:8080/api/type-gsm/`);

    setTypesGSM(typesGSM);
  }

  async function deleteRecord(record) {
    const message = await funcRequest(
      `http://localhost:8080/api/record/${record.ID}`,
      "DELETE"
    );

    window.alert(message);

    loadRecords();
  }

  async function beginUpdateRecord(record = null) {
    if (changedRecord === null && record !== null) {
      setChangedRecord(record);

      setInputObjectRecord({
        ID: null,
        IDsheet: null,
        IDcar: null,
        IDdriver: null,
        NumberPL: null,
        IDgsm: null,
        Liter: null,
      });
    } else if (
      changedRecord !== null &&
      record !== null &&
      changedRecord !== record
    ) {
      setChangedRecord(record);

      setInputObjectRecord({
        ID: null,
        IDsheet: null,
        IDcar: null,
        IDdriver: null,
        NumberPL: null,
        IDgsm: null,
        Liter: null,
      });
    } else {
      setChangedRecord(null);
    }
  }

  return (
    <div className="Records">
      <h4>Путевые листы</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID путевого листа</th>
              <th>Ведомость (ID)</th>
              <th>Автомобиль (ID)</th>
              <th>Водитель (ID)</th>
              <th>Номер путевого листа</th>
              <th>ГСМ (ID)</th>
              <th>Литры</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.length ? (
              allRecords.map((record) => {
                return (
                  <tr key={record.ID}>
                    <td>{record.ID}</td>
                    <td>
                      {record.IDsheet.NumberSheet} ({record.IDsheet.ID})
                    </td>
                    <td>
                      {record.IDcar.Model} : {record.IDcar.Number} (
                      {record.IDcar.ID})
                    </td>
                    <td>
                      {record.IDdriver.FIO} ({record.IDdriver.ID})
                    </td>
                    <td>{record.NumberPL}</td>
                    <td>
                      {record.IDgsm.Name} ({record.IDgsm.ID})
                    </td>
                    <td>{record.Liter}</td>
                    <td>
                      <button
                        className="button-modify"
                        onClick={() => {
                          deleteRecord(record);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-modify"
                        onClick={() => {
                          beginUpdateRecord(record);
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
                <td colspan="8">Путевых листов не найдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedRecord !== null ? (
          <div>
            <h4>Редактирование путевого листа {changedRecord.ID}</h4>

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите ведомость") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }
                let tempSheet = e.target.value;

                let tempThisRecord = {
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  IDsheet: tempSheet,
                };

                setInputObjectRecord(tempThisRecord);
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

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите автомобиль") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }
                let tempVehicle = e.target.value;

                let tempThisRecord = {
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  IDcar: tempVehicle,
                };

                setInputObjectRecord(tempThisRecord);
              }}
            >
              <option>Выберите автомобиль</option>
              {allVehicles.map((vehicle) => {
                return (
                  <option key={vehicle.ID} value={vehicle.ID}>
                    {vehicle.Model} : {vehicle.Number}
                  </option>
                );
              })}
            </select>

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите водителя") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }
                let tempWorker = e.target.value;

                let tempThisRecord = {
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  IDdriver: tempWorker,
                };

                setInputObjectRecord(tempThisRecord);
              }}
            >
              <option>Выберите водителя</option>
              {allWorkers.map((worker) => {
                return (
                  <option key={worker.ID} value={worker.ID}>
                    {worker.FIO} ({worker.ID})
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              className="input-write"
              onChange={(e) => {
                setInputObjectRecord({
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  NumberPL: e.target.value,
                });
              }}
              placeholder="Введите номер путевого листа"
            />

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите ГСМ") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }
                let tempGSM = e.target.value;

                let tempThisRecord = {
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  IDgsm: tempGSM,
                };

                setInputObjectRecord(tempThisRecord);
              }}
            >
              <option>Выберите ГСМ</option>
              {allTypesGSM.map((gsm) => {
                return (
                  <option key={gsm.ID} value={gsm.ID}>
                    {gsm.Name} ({gsm.ID})
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              className="input-write"
              onChange={(e) => {
                setInputObjectRecord({
                  ...inputObjectRecord,
                  ID: changedRecord.ID,
                  Liter: e.target.value,
                });
              }}
              placeholder="Введите количество литров"
            />

            <button
              className="button-modify"
              onClick={async () => {
                const message = await funcRequest(
                  `http://localhost:8080/api/record/`,
                  `PUT`,
                  inputObjectRecord
                );

                setChangedRecord(null);

                setInputObjectRecord({
                  ID: null,
                  IDsheet: null,
                  IDcar: null,
                  IDdriver: null,
                  NumberPL: null,
                  IDgsm: null,
                  Liter: null,
                });

                window.alert(message);

                loadRecords();
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
          Создать путевой лист{" "}
          {createRecord !== null ? ` - Номер: ${createRecord.NumberPL}` : ""}
        </h4>

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите ведомость") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }
            let tempSheet = e.target.value;

            let tempThisRecord = {
              ...createRecord,
              IDsheet: tempSheet,
            };

            setCreateRecord(tempThisRecord);
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

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите автомобиль") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }
            let tempVehicle = e.target.value;

            let tempThisRecord = {
              ...createRecord,
              IDcar: tempVehicle,
            };

            setCreateRecord(tempThisRecord);
          }}
        >
          <option>Выберите автомобиль</option>
          {allVehicles.map((vehicle) => {
            return (
              <option key={vehicle.ID} value={vehicle.ID}>
                {vehicle.Model} : {vehicle.Number}
              </option>
            );
          })}
        </select>

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите водителя") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }
            let tempWorker = e.target.value;

            let tempThisRecord = {
              ...createRecord,
              IDdriver: tempWorker,
            };

            setCreateRecord(tempThisRecord);
          }}
        >
          <option>Выберите водителя</option>
          {allWorkers.map((worker) => {
            return (
              <option key={worker.ID} value={worker.ID}>
                {worker.FIO} ({worker.ID})
              </option>
            );
          })}
        </select>

        <input
          type="text"
          className="input-write"
          onChange={(e) => {
            setCreateRecord({
              ...createRecord,
              NumberPL: e.target.value,
            });
          }}
          placeholder="Введите номер путевого листа"
        />

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите ГСМ") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }
            let tempGSM = e.target.value;

            let tempThisRecord = {
              ...createRecord,
              IDgsm: tempGSM,
            };

            setCreateRecord(tempThisRecord);
          }}
        >
          <option>Выберите ГСМ</option>
          {allTypesGSM.map((gsm) => {
            return (
              <option key={gsm.ID} value={gsm.ID}>
                {gsm.Name} ({gsm.ID})
              </option>
            );
          })}
        </select>

        <input
          type="text"
          className="input-write"
          onChange={(e) => {
            setCreateRecord({
              ...createRecord,
              Liter: e.target.value,
            });
          }}
          placeholder="Введите количество литров"
        />

        <button
          className="button-modify"
          onClick={async () => {
            const message = await funcRequest(
              `http://localhost:8080/api/record/`,
              "POST",
              createRecord
            );

            setCreateRecord(null);

            window.alert(message);

            loadRecords();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default Records;
