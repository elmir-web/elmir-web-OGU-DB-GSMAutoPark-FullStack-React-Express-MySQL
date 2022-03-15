const Router = require("express");
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware"); // 5. Подключаем мидлваер ролей

const router = new Router();

router.post("/register", accountController.createAccount);
router.post("/login", accountController.loginAccount);
// router.get("/users", authMiddleware, accountController.usersAccount);
// этот запрос могут использовать только те, чьи должности указаны вторым параметром, для других метод контроллера просто не работает
router.get(
  "/users",
  roleMiddleware([`Кандидат`, `Подписант`]), // те самые должности
  accountController.usersAccount // метод контроллера будет работать только для тех чьи роли здесь указаны
);

module.exports = router;
