import { useState, useEffect } from "react";

import "./Workers.scss";

function Workers({ funcRequest }) {
  let [allWorkers, setWorkers] = useState([]);
  let [allAutoBases, setAutoBases] = useState([]);
  let [changedWorker, setChangedWorker] = useState(null);
  let [inputObjectWorker, setInputObjectWorker] = useState({
    ID: null,
    FIO: "",
    Function: null,
    IDbase: null,
  });
  let [createWorker, setCreateWorker] = useState(null);

  useEffect(loadWorkers, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadWorkers() {
    const workers = await funcRequest(`/api/worker/`);

    setWorkers(workers);

    const autoBases = await funcRequest(`/api/autobase/`);

    setAutoBases(autoBases);
  }

  async function deleteWorker(worker) {
    const message = await funcRequest(`/api/worker/${worker.ID}`, "DELETE");

    window.alert(message);

    loadWorkers();
  }

  async function beginUpdateWorker(worker = null) {
    if (changedWorker === null && worker !== null) {
      setChangedWorker(worker);

      setInputObjectWorker({
        ID: null,
        FIO: "",
        Function: null,
        IDbase: null,
      });
    } else if (
      changedWorker !== null &&
      worker !== null &&
      changedWorker !== worker
    ) {
      setChangedWorker(worker);

      setInputObjectWorker({
        ID: null,
        FIO: "",
        Function: null,
        IDbase: null,
      });
    } else {
      setChangedWorker(null);
    }
  }

  return (
    <div className="Workers">
      <h4>Рабочий персонал</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID сотрудника</th>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Автобаза (ID)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {allWorkers.length ? (
              allWorkers.map((worker) => {
                return (
                  <tr key={worker.ID}>
                    <td>{worker.ID}</td>
                    <td>{worker.FIO}</td>
                    <td>
                      {worker.Function === 1 ? "Водитель" : "Подписант"} (
                      {worker.Function})
                    </td>
                    <td>
                      {worker.IDbase.Name} ({worker.IDbase.ID})
                    </td>
                    <td>
                      <button
                        className="button-table"
                        onClick={() => {
                          deleteWorker(worker);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-table"
                        onClick={() => {
                          beginUpdateWorker(worker);
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
                <td colSpan="5">Рабочий персонал не найден</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedWorker !== null ? (
          <div>
            <h4>
              Редактирование сотрудника {changedWorker.FIO} :{" "}
              {changedWorker.Function === 1 ? "Водитель" : "Подписант"} :{" "}
              {changedWorker.IDbase.ID}
            </h4>

            <input
              className="input-write"
              value={inputObjectWorker.Name}
              onChange={(e) => {
                setInputObjectWorker({
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  FIO: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите ФИО сотрудника"
            />

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите должность") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }

                let tempFunction = e.target.value === "Водитель" ? 1 : 2;

                let tempThisWorker = {
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  Function: tempFunction,
                };

                setInputObjectWorker(tempThisWorker);
              }}
            >
              <option>Выберите должность</option>
              <option>Водитель</option>
              <option>Подписант</option>
            </select>

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите автобазу") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }

                let tempAutoBase = e.target.value;

                let tempThisWorker = {
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  IDbase: tempAutoBase,
                };

                setInputObjectWorker(tempThisWorker);
              }}
            >
              <option>Выберите автобазу</option>
              {allAutoBases.map((autobase) => {
                return (
                  <option key={autobase.ID} value={autobase.ID}>
                    {autobase.Name}
                  </option>
                );
              })}
            </select>

            <button
              className="button-modify"
              onClick={async () => {
                const message = await funcRequest(
                  `/api/worker/`,
                  `PUT`,
                  inputObjectWorker
                );

                setChangedWorker(null);
                setInputObjectWorker({
                  ID: null,
                  FIO: "",
                  Function: null,
                  IDbase: null,
                });

                window.alert(message);

                loadWorkers();
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
          Создать сотрудника{" "}
          {createWorker !== null
            ? ` - ФИО: ${createWorker.FIO} Должность: ${
                createWorker.Function === 1 ? "Водитель" : "Подписант"
              } ID автобазы: ${createWorker.IDbase}`
            : ""}
        </h4>

        <input
          className="input-write"
          onChange={(e) => {
            setCreateWorker({ ...createWorker, FIO: e.target.value });
          }}
          type="text"
          placeholder="Введите ФИО сотрудника"
        />

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите должность") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }

            let tempFunction = e.target.value === "Водитель" ? 1 : 2;

            setCreateWorker({ ...createWorker, Function: tempFunction });
          }}
        >
          <option>Выберите должность</option>
          <option>Водитель</option>
          <option>Подписант</option>
        </select>

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите автобазу") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }

            let tempAutoBase = e.target.value;

            setCreateWorker({ ...createWorker, IDbase: tempAutoBase });
          }}
        >
          <option>Выберите автобазу</option>
          {allAutoBases.map((autobase) => {
            return (
              <option key={autobase.ID} value={autobase.ID}>
                {autobase.Name}
              </option>
            );
          })}
        </select>

        <button
          className="button-modify"
          onClick={async () => {
            const message = await funcRequest(
              `/api/worker/`,
              "POST",
              createWorker
            );

            window.alert(message);

            loadWorkers();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default Workers;
