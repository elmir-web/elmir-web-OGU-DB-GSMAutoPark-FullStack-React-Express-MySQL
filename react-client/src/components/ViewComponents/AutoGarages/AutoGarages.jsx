import { useState, useEffect } from "react";

import "./AutoGarages.scss";

function AutoGarages({ funcRequest }) {
  let [allAutoGarages, setAutoGarages] = useState([]);
  let [changedAutoGarage, setChangedAutoGarage] = useState(null);
  let [allAutoBases, setAutoBases] = useState([]);
  let [inputObjectAutoGarage, setInputObjectAutoGarage] = useState({
    ID: null,
    Name: "",
    IDbase: null,
  });
  let [createAutoBase, setCreateAutoBase] = useState(null);

  useEffect(loadAutoGarages, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadAutoGarages() {
    const autoGarages = await funcRequest(
      `http://localhost:8080/api/autogarage/`
    );

    setAutoGarages(autoGarages);

    const autoBases = await funcRequest(`http://localhost:8080/api/autobase/`);

    setAutoBases(autoBases);
  }

  async function deleteAutoGarage(autogarage = null) {
    const message = await funcRequest(
      `http://localhost:8080/api/autogarage/${autogarage.ID}`,
      "DELETE"
    );

    window.alert(message);

    loadAutoGarages();
  }

  async function beginUpdateAutoGaraga(autogarage = null) {
    if (changedAutoGarage === null && autogarage !== null) {
      setChangedAutoGarage(autogarage);

      setInputObjectAutoGarage({
        ID: null,
        Name: "",
        IDbase: null,
      });
    } else if (
      changedAutoGarage !== null &&
      autogarage !== null &&
      changedAutoGarage !== autogarage
    ) {
      setChangedAutoGarage(autogarage);

      setInputObjectAutoGarage({
        ID: null,
        Name: "",
        IDbase: null,
      });
    } else {
      setChangedAutoGarage(null);
    }
  }

  return (
    <div className="AutoGarages">
      <h4>Автомобильные гаражи</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID гаража</th>
              <th>Название гаража</th>
              <th>Название автобазы (ID автобазы)</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allAutoGarages.length ? (
              allAutoGarages.map((autogarage) => {
                return (
                  <tr key={autogarage.ID}>
                    <td>{autogarage.ID}</td>
                    <td>{autogarage.Name}</td>
                    <td>
                      {autogarage.IDbase.Name} ({autogarage.IDbase.ID})
                    </td>
                    <td>
                      <button
                        className="button-table"
                        onClick={() => {
                          deleteAutoGarage(autogarage);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-table"
                        onClick={() => {
                          beginUpdateAutoGaraga(autogarage);
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
                <td colSpan="4">Автомобильные гаражи не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedAutoGarage !== null ? (
          <div className="controller-changegsm">
            <h4>
              Редактирование автомобильного гаража {changedAutoGarage.ID}:
              {changedAutoGarage.Name}
            </h4>

            <input
              className="input-write"
              value={inputObjectAutoGarage.Name}
              onChange={(e) => {
                setInputObjectAutoGarage({
                  ...inputObjectAutoGarage,
                  ID: changedAutoGarage.ID,
                  Name: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите название гаража"
            />

            <select
              className="input-select"
              size="1"
              onChange={(e) => {
                if (e.target.value === "Выберите автобазу") {
                  window.alert("Ошибка: Выберите варианты ниже");
                  return;
                }

                let tempAutoBase = e.target.value;

                let tempThisGarage = {
                  ...inputObjectAutoGarage,
                  ID: changedAutoGarage.ID,
                  IDbase: tempAutoBase,
                };

                setInputObjectAutoGarage(tempThisGarage);
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
                  `http://localhost:8080/api/autogarage/`,
                  `PUT`,
                  inputObjectAutoGarage
                );

                setChangedAutoGarage(null);
                setInputObjectAutoGarage({
                  ID: null,
                  Name: "",
                  IDbase: null,
                });

                window.alert(message);

                loadAutoGarages();
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
          Создать гараж{" "}
          {createAutoBase !== null ? ` - Название: ${createAutoBase.Name}` : ""}
        </h4>

        <input
          className="input-write"
          onChange={(e) => {
            setCreateAutoBase({ ...createAutoBase, Name: e.target.value });
          }}
          type="text"
          placeholder="Введите название гаража"
        />

        <select
          className="input-select"
          size="1"
          onChange={(e) => {
            if (e.target.value === "Выберите автобазу") {
              window.alert("Ошибка: Выберите варианты ниже");
              return;
            }

            let tempAutoBase = e.target.value;

            setCreateAutoBase({ ...createAutoBase, IDbase: tempAutoBase });
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
              `http://localhost:8080/api/autogarage/`,
              "POST",
              createAutoBase
            );

            setCreateAutoBase(null);

            window.alert(message);

            loadAutoGarages();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default AutoGarages;
