import { useState, useEffect } from "react";

import "./Workers.scss";

function Workers({ funcRequest }) {
  let [allWorkers, setWorkers] = useState([]);
  let [allAutoBases, setAutoBases] = useState([]);
  let [changedWorker, setChangedWorker] = useState(null);
  let [inputObjectWorker, setInputObjectWorker] = useState({
    ID: null,
    FIO: "",
    loginUser: "",
    passwordUser: "",
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
        FIO: worker.FIO,
        loginUser: worker.loginUser,
        passwordUser: worker.passwordUser,
        Function: worker.Function,
        IDbase: worker.IDbase,
      });
    } else if (
      changedWorker !== null &&
      worker !== null &&
      changedWorker !== worker
    ) {
      setChangedWorker(worker);

      setInputObjectWorker({
        ID: null,
        FIO: worker.FIO,
        loginUser: worker.loginUser,
        passwordUser: worker.passwordUser,
        Function: worker.Function,
        IDbase: worker.IDbase,
      });
    } else {
      setChangedWorker(null);
    }
  }

  function getFunctionStatusWorker(FunctionID) {
    if (FunctionID === 0) return "Кандидат";
    else if (FunctionID === 1) return "Водитель";
    else if (FunctionID === 2) return "Подписант";
    else if (FunctionID === 3) return "Админ";
  }

  function getIDToWorkerStatus(functionName) {
    if (functionName === "Кандидат") return 0;
    else if (functionName === "Водитель") return 1;
    else if (functionName === "Подписант") return 2;
    else if (functionName === "Админ") return 3;
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
              <th>Логин</th>
              <th>Пароль</th>
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
                    <td>{worker.loginUser}</td>
                    <td>
                      {worker.passwordUser.length === 0
                        ? "Не установлен"
                        : "Пароль установлен"}
                    </td>
                    <td>
                      {getFunctionStatusWorker(worker.Function)} (
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
              {getFunctionStatusWorker(changedWorker.Function)} :{" "}
              {changedWorker.IDbase.ID}
            </h4>

            <input
              className="input-write"
              value={inputObjectWorker.FIO}
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

            <input
              className="input-write"
              value={inputObjectWorker.loginUser}
              onChange={(e) => {
                setInputObjectWorker({
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  loginUser: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите логин сотрудника"
            />

            <input
              className="input-write"
              value={inputObjectWorker.passwordUser}
              onChange={(e) => {
                setInputObjectWorker({
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  passwordUser: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите пароль сотрудника"
            />

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value.indexOf("Выберите должность") !== -1) {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }

                let tempFunction = getIDToWorkerStatus(e.target.value);

                let tempThisWorker = {
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  Function: tempFunction,
                };

                setInputObjectWorker(tempThisWorker);
              }}
            >
              <option>
                Выберите должность (Текущая должность:{" "}
                {getFunctionStatusWorker(inputObjectWorker.Function)})
              </option>
              <option>Кандидат</option>
              <option>Водитель</option>
              <option>Подписант</option>
              <option>Админ</option>
            </select>

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value.indexOf("Выберите автобазу") !== -1) {
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
              <option>
                Выберите автобазу (Текущая автобаза:{" "}
                {inputObjectWorker.IDbase.Name} )
              </option>
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
                let changedThisWorker = {
                  ...inputObjectWorker,
                  ID: changedWorker.ID,
                  IDbase: inputObjectWorker.IDbase.ID,
                };

                const message = await funcRequest(
                  `/api/worker/`,
                  `PUT`,
                  changedThisWorker
                );

                setChangedWorker(null);
                setInputObjectWorker({
                  ID: null,
                  FIO: "",
                  loginUser: "",
                  passwordUser: "",
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
            ? ` - ФИО: ${createWorker.FIO} Логин: ${
                createWorker.loginUser
              } Пароль: ${
                createWorker.passwordUser
              } Должность: ${getFunctionStatusWorker(
                createWorker.Function
              )} ID автобазы: ${createWorker.IDbase}`
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

        <input
          className="input-write"
          onChange={(e) => {
            setCreateWorker({ ...createWorker, loginUser: e.target.value });
          }}
          type="text"
          placeholder="Введите логин сотрудника"
        />

        <input
          className="input-write"
          onChange={(e) => {
            setCreateWorker({ ...createWorker, passwordUser: e.target.value });
          }}
          type="text"
          placeholder="Введите пароль сотрудника"
        />

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            let tempFunction = null;

            if (e.target.value === "Выберите должность") {
              window.alert("Ошибка: Выберите варианты ниже");

              setCreateWorker({ ...createWorker, Function: tempFunction });
              return;
            }

            tempFunction = getIDToWorkerStatus(e.target.value);

            setCreateWorker({ ...createWorker, Function: tempFunction });
          }}
        >
          <option>Выберите должность</option>
          <option>Кандидат</option>
          <option>Водитель</option>
          <option>Подписант</option>
          <option>Админ</option>
        </select>

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            let tempAutoBase = null;

            if (e.target.value === "Выберите автобазу") {
              window.alert("Ошибка: Выберите варианты ниже");

              setCreateWorker({ ...createWorker, IDbase: tempAutoBase });
              return;
            }

            tempAutoBase = e.target.value;

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
            if (createWorker === null) {
              window.alert("Ошибка: Вы ничего не сделали");
              return;
            }

            if (
              createWorker.FIO === `` ||
              createWorker.FIO === undefined ||
              createWorker.FIO === null
            ) {
              window.alert("Ошибка: Не ведены фамилия, имя и отчество");
              return;
            }

            if (
              createWorker.loginUser === `` ||
              createWorker.loginUser === undefined ||
              createWorker.loginUser === null
            ) {
              window.alert("Ошибка: Не веден логин");
              return;
            }

            if (
              createWorker.passwordUser === `` ||
              createWorker.passwordUser === undefined ||
              createWorker.passwordUser === null
            ) {
              window.alert("Ошибка: Не веден пароль");
              return;
            }

            if (
              createWorker.Function === `` ||
              createWorker.Function === undefined ||
              createWorker.Function === null ||
              createWorker.Function === "Выберите должность"
            ) {
              window.alert("Ошибка: Не выбрана должность");
              return;
            }

            if (
              createWorker.IDbase === `` ||
              createWorker.IDbase === undefined ||
              createWorker.IDbase === null ||
              createWorker.IDbase === "Выберите автобазу"
            ) {
              window.alert("Ошибка: Не выбрана автобаза");
              return;
            }

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
