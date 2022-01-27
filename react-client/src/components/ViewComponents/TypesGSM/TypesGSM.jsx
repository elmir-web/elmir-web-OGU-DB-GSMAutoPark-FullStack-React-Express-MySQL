import { useEffect, useState } from "react";

import "./TypesGSM.scss";

function TypesGSM({ funcRequest }) {
  let [allTypesGSM, setTypesGSM] = useState([]);
  let [changedGSM, setChangedGSM] = useState(null);
  let [inputObjectGSM, setInputObjectGSM] = useState({
    ID: null,
    Name: "",
    ForKilo: "",
  });
  let [createObjectGSM, setCreateObjectGSM] = useState(null);

  useEffect(loadTypesGSM, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadTypesGSM() {
    const gsm = await funcRequest("/api/type-gsm/");

    setTypesGSM(gsm);
  }

  async function deleteTypeGSM(itemGsm = null) {
    const message = await funcRequest(`/api/type-gsm/${itemGsm.ID}`, "DELETE");

    window.alert(message);

    loadTypesGSM();
  }

  async function beginUpdateGSM(itemGsm = null) {
    if (changedGSM === null && itemGsm !== null) {
      setChangedGSM(itemGsm);

      setInputObjectGSM({
        ID: null,
        Name: "",
        ForKilo: "",
      });
    } else if (
      changedGSM !== null &&
      itemGsm !== null &&
      changedGSM !== itemGsm
    ) {
      setChangedGSM(itemGsm);

      setInputObjectGSM({
        ID: null,
        Name: "",
        ForKilo: "",
      });
    } else {
      setChangedGSM(null);
    }
  }

  return (
    <div className="TypesGSM">
      <h4>Все виды горюче-смазочных материалов</h4>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID ГСМ</th>
              <th>Название ГСМ</th>
              <th>Вес (в кг)</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allTypesGSM.length ? (
              allTypesGSM.map((itemGsm) => {
                return (
                  <tr key={itemGsm.ID}>
                    <td>{itemGsm.ID}</td>
                    <td>{itemGsm.Name}</td>
                    <td>{itemGsm.ForKilo}</td>
                    <td>
                      <button
                        className="button-table"
                        onClick={() => {
                          deleteTypeGSM(itemGsm);
                        }}
                      >
                        Удалить
                      </button>
                      <button
                        className="button-table"
                        onClick={() => {
                          beginUpdateGSM(itemGsm);
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
                <td colSpan="4">Виды ГСМ не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="changed-wrapper">
        {changedGSM !== null ? (
          <div className="controller-changegsm">
            <h4>
              Редактирование автомобильной базы {changedGSM.ID}:
              {changedGSM.Name}
            </h4>
            <input
              className="input-write"
              value={inputObjectGSM.Name}
              onChange={(e) => {
                setInputObjectGSM({
                  ...inputObjectGSM,
                  ID: changedGSM.ID,
                  Name: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите название вида ГСМ"
            />
            <input
              className="input-write"
              value={inputObjectGSM.ForKilo}
              onChange={(e) => {
                setInputObjectGSM({
                  ...inputObjectGSM,
                  ID: changedGSM.ID,
                  ForKilo: e.target.value,
                });
              }}
              type="text"
              placeholder="Введите вес вида ГСМ (Пример: 3.54)"
            />
            <button
              className="button-modify"
              onClick={async () => {
                const message = await funcRequest(
                  `/api/type-gsm/`,
                  "PUT",
                  inputObjectGSM
                );

                setChangedGSM(null);
                setInputObjectGSM({
                  ID: null,
                  Name: "",
                  ForKilo: "",
                });

                window.alert(message);

                loadTypesGSM();
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
          Создать вид ГСМ{" "}
          {createObjectGSM !== null
            ? ` - Название новой ГСМ: ${createObjectGSM.Name} | Вес: ${createObjectGSM.ForKilo}`
            : ""}
        </h4>

        <input
          className="input-write"
          onChange={(e) => {
            if (e.target.value === 0) setCreateObjectGSM(null);

            setCreateObjectGSM({ ...createObjectGSM, Name: e.target.value });
          }}
          type="text"
          placeholder="Введите название нового вида ГСМ"
        />

        <input
          className="input-write"
          onChange={(e) => {
            if (e.target.value === 0) setCreateObjectGSM(null);

            setCreateObjectGSM({ ...createObjectGSM, ForKilo: e.target.value });
          }}
          type="text"
          placeholder="Введите вес нового вида ГСМ (3.54)"
        />

        <button
          className="button-modify"
          onClick={async () => {
            const message = await funcRequest(
              `/api/type-gsm/`,
              "POST",
              createObjectGSM
            );

            setCreateObjectGSM(null);

            window.alert(message);

            loadTypesGSM();
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
}

export default TypesGSM;
