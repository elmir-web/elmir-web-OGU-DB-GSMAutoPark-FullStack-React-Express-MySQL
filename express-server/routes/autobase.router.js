const Router = require("express");
const autoBaseController = require("./../controllers/autobase.controller");

const router = new Router();

router.post("/autobase", autoBaseController.createAutoBase);
router.get("/autobase", autoBaseController.getAutoBase);
router.get("/autobase/:id", autoBaseController.getOneAutoBase);
router.put("/autobase", autoBaseController.updateAutoBase);
router.delete("/autobase/:id", autoBaseController.deleteAutoBase);

module.exports = router;
