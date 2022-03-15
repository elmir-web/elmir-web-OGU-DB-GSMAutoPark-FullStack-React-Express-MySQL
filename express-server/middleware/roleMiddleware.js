const jwt = require("jsonwebtoken"); // берем методы для работы с токенами

const { secret_key } = require("./../ServerConfig.json"); // берем секретный ключ

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1]; // берем токен

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }

      const { Function } = jwt.verify(token, secret_key); // расшифровываем токен и берем от туда должность

      let hasRole = false; // по умолчанию нет доступа

      // бегаем по переданным ролям в мидлваер
      roles.forEach(function (role) {
        // если наша роль одна из них
        if (Function === role) {
          hasRole = true; // тогда разрешаем доступ
        }
      });

      // если роли так и не подошли
      if (!hasRole) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      next(); // вызываем следующий мидлваер
    } catch (err) {
      console.log(err);

      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
