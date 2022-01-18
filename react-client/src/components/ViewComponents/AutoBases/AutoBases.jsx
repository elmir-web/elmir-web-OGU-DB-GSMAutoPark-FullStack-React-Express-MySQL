import { useEffect, useState } from "react";

import "./AutoBases.scss";

function AutoBases({ funcRequest }) {
  let [allAutoBases, setAutoBases] = useState([]);
  let [changedAutoBase, setChangedAutoBase] = useState(null);
  let [inputNameAutoBase, setInputNameAutoBase] = useState("");

  // eslint-disable-next-line no-use-before-define
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAutoBases, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadAutoBases() {
    const autoBases = await funcRequest("http://localhost:8080/api/autobase/");

    setAutoBases(autoBases);
  }

  async function deleteAutoBase(AutoBase) {
    const message = await funcRequest(
      `http://localhost:8080/api/autobase/${AutoBase.ID}`,
      "DELETE"
    );

    window.alert(message);

    loadAutoBases();
  }

  async function beginUpdateAutoBase(AutoBase = null) {
    if (changedAutoBase === null && AutoBase !== null) {
      setChangedAutoBase(AutoBase);
    } else if (
      changedAutoBase !== null &&
      AutoBase !== null &&
      changedAutoBase !== AutoBase
    ) {
      setChangedAutoBase(AutoBase);
    } else {
      setChangedAutoBase(null);
    }
  }

  return (
    <div className="AutoBases">
      <h4>Автомобильные базы</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID автобазы</th>
              <th>Название автобазы</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line array-callback-return */}
            {allAutoBases.map((itemAutoBase) => {
              return (
                <tr key={itemAutoBase.ID}>
                  <td>{itemAutoBase.ID}</td>
                  <td>{itemAutoBase.Name}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteAutoBase(itemAutoBase);
                      }}
                    >
                      Удалить
                    </button>
                    <button
                      onClick={() => {
                        beginUpdateAutoBase(itemAutoBase);
                      }}
                    >
                      Изменить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedAutoBase !== null ? (
          <div className="controller-changeautobase">
            <h4>
              Редактирование автомобильной базы {changedAutoBase.ID}:
              {changedAutoBase.Name}
            </h4>
            <input
              value={inputNameAutoBase}
              onChange={(e) => {
                setInputNameAutoBase(e.target.value);
              }}
              type="text"
              placeholder="Введите название автомобильной базы"
            />
            <button
              onClick={async () => {
                let tempChanged = {
                  ...changedAutoBase,
                  Name: inputNameAutoBase,
                };

                setChangedAutoBase(null);
                setInputNameAutoBase("");

                const message = await funcRequest(
                  `http://localhost:8080/api/autobase/`,
                  "PUT",
                  tempChanged
                );

                window.alert(message);
                loadAutoBases();
              }}
            >
              Изменить
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AutoBases;
