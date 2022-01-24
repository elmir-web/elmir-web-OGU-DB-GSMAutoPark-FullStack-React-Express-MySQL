import { useState, useEffect } from "react";

import "./Autos.scss";

function Autos({ funcRequest }) {
  let [allVehicles, setVehicles] = useState([]);
  let [allAutoGarages, setAutoGarages] = useState([]);
  let [changedVehicle, setChangedVehicle] = useState(null);
  let [inputObjectVehicle, setInputObjectVehicle] = useState({
    ID: null,
    Model: "",
    Number: "",
    IDgarage: null,
  });
  let [createVehicle, setCreateVehicle] = useState(null);

  useEffect(loadVehicles, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadVehicles() {
    const vehicles = await funcRequest(`http://localhost:8080/api/vehicle/`);

    setVehicles(vehicles);

    const autoGarages = await funcRequest(
      `http://localhost:8080/api/autogarage/`
    );

    setAutoGarages(autoGarages);
  }

  async function deleteVehicle(veh = null) {
    const message = await funcRequest(
      `http://localhost:8080/api/vehicle/${veh.ID}`,
      "DELETE"
    );

    window.alert(message);

    loadVehicles();
  }

  async function beginUpdateVeh(veh = null) {
    if (changedVehicle === null && veh !== null) {
      setChangedVehicle(veh);

      setInputObjectVehicle({
        ID: null,
        Model: "",
        Number: "",
        IDgarage: null,
      });
    } else if (
      changedVehicle !== null &&
      veh !== null &&
      changedVehicle !== veh
    ) {
      setChangedVehicle(veh);

      setInputObjectVehicle({
        ID: null,
        Model: "",
        Number: "",
        IDgarage: null,
      });
    } else {
      setChangedVehicle(null);
    }
  }

  return (
    <div className="Autos">
      <h4>Автомобили</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Модель</th>
              <th>Гос.номер</th>
              <th>Гараж (ID)</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allVehicles.length ? (
              allVehicles.map((veh) => {
                return (
                  <tr key={veh.ID}>
                    <td>{veh.ID}</td>
                    <td>{veh.Model}</td>
                    <td>{veh.Number}</td>
                    <td>
                      {veh.IDgarage.Name} ({veh.IDgarage.ID})
                    </td>
                    <td>
                      <button
                        className="button-table"
                        onClick={() => {
                          deleteVehicle(veh);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-table"
                        onClick={() => {
                          beginUpdateVeh(veh);
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
                <td colSpan="5">Автомобили не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedVehicle !== null ? (
          <div className="controller-changegsm">
            <h4>
              Редактирование автомобиля {changedVehicle.ID}:
              {changedVehicle.Model}:{changedVehicle.Number}:
              {changedVehicle.IDgarage.ID}
            </h4>

            <input
              className="input-write"
              value={inputObjectVehicle.Model}
              onChange={(e) => {
                setInputObjectVehicle({
                  ...inputObjectVehicle,
                  ID: changedVehicle.ID,
                  Model: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите модель автомобиля"
            />

            <input
              className="input-write"
              value={inputObjectVehicle.Number}
              onChange={(e) => {
                setInputObjectVehicle({
                  ...inputObjectVehicle,
                  ID: changedVehicle.ID,
                  Number: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите гос.номер автомобиля"
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

                let tempThisVeh = {
                  ...inputObjectVehicle,
                  ID: changedVehicle.ID,
                  IDgarage: tempAutoGarage,
                };

                setInputObjectVehicle(tempThisVeh);
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

            <button
              className="button-modify"
              onClick={async () => {
                const message = await funcRequest(
                  `http://localhost:8080/api/vehicle/`,
                  `PUT`,
                  inputObjectVehicle
                );

                setChangedVehicle(null);
                setInputObjectVehicle({
                  ID: null,
                  Model: "",
                  Number: "",
                  IDgarage: null,
                });

                window.alert(message);

                loadVehicles();
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
          Создать автомобиль{" "}
          {createVehicle !== null
            ? ` - Модель: ${createVehicle.Model} | Гос.номер: ${createVehicle.Number}`
            : ""}
        </h4>

        <input
          className="input-write"
          onChange={(e) => {
            setCreateVehicle({
              ...createVehicle,
              Model: e.target.value,
            });
          }}
          type="text"
          placeholder="Введите модель автомобиля"
        />

        <input
          className="input-write"
          onChange={(e) => {
            setCreateVehicle({
              ...createVehicle,
              Number: e.target.value,
            });
          }}
          type="text"
          placeholder="Введите гос.номер автомобиля"
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

            setCreateVehicle({
              ...createVehicle,
              IDgarage: tempAutoGarage,
            });
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

        <button
          className="button-modify"
          onClick={async () => {
            const message = await funcRequest(
              `http://localhost:8080/api/vehicle/`,
              "POST",
              createVehicle
            );

            setCreateVehicle(null);

            window.alert(message);

            loadVehicles();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default Autos;
