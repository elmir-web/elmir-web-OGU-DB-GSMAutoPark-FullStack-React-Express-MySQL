const jwt = require("jsonwebtoken");

const { secret_key } = require("./../ServerConfig.json");

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

// функция генерации токена
function generateJWTAccessToken(idWorker, functionWorker, passwordUser) {
  // информация которая надо засунуть в токен
  const payload = {
    ID: idWorker,
    Function: functionWorker,
    passwordUser,
  };

  // генерируем токен на 24 часа (3 параметр) используя инфу которую надо туда засунуть (1 параметр) на основании ключа (2 параметр)
  return jwt.sign(payload, secret_key, { expiresIn: "24h" });
}

// методы (контроллеры)
class accountController {
  async createAccount(req, res) {
    console.log(req.body);
    const { FIO, loginUser, passwordUser } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO worker (FIO, loginUser, passwordUser, worker.Function, IDbase) VALUES ('${FIO}', '${loginUser}', '${passwordUser}', '0', '0')`
    );

    res.json(
      `Вы зарегистрированы под данными (ФИО: "${FIO}", Логин: "${loginUser}", Пароль: "${passwordUser}") как кандидат.`
    );
  }

  async loginAccount(req, res) {
    const { loginUser, passwordUser } = req.body; // берем логин и пароль

    let [rowsAllWorkers] = await global.connectMySQL.execute(
      `SELECT * FROM worker WHERE loginUser = '${loginUser}'`
    );

    if (!rowsAllWorkers.length) {
      return res.status(400).json({ message: "Аккаунт не найден" });
    } else if (rowsAllWorkers[0].passwordUser !== passwordUser) {
      return res.status(400).json({ message: "Пароль не верный" });
    } else {
      const JWTToken = generateJWTAccessToken(
        rowsAllWorkers[0].ID,
        getFunctionStatusWorker(rowsAllWorkers[0].Function),
        rowsAllWorkers[0].passwordUser
      ); // генерируем токен с данными из аккаунта, а имеено порядковый номер, должность и пароль

      res.json({ token: JWTToken }); // отдаем токен клиенту
    }
  }

  async usersAccount(req, res) {
    res.json("test");
  }
}

module.exports = new accountController();
