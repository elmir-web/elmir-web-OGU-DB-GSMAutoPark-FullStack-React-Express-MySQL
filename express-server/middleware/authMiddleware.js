const jwt = require("jsonwebtoken");

const { secret_key } = require("./../ServerConfig.json");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    const decodedToken = jwt.verify(token, secret_key);

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log(err);

    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
