const Router = require("express");
const autoGarageController = require("../controllers/autogarage.controller");

const router = new Router();

router.post("/autogarage", autoGarageController.createAutoGarage);
router.get("/autogarage", autoGarageController.getAutoGarage);
router.get("/autogarage/:id", autoGarageController.getOneAutoGarage);
router.put("/autogarage", autoGarageController.updateAutoGarage);
router.delete("/autogarage/:id", autoGarageController.deleteAutoGarage);

module.exports = router;
