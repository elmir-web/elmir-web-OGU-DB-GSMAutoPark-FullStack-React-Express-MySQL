const Router = require("express");
const typesGSMController = require("../controllers/typesGSM.controller");

const router = new Router();

router.post("/type-gsm", typesGSMController.createTypeGSM);
router.get("/type-gsm", typesGSMController.getTypesGSM);
router.get("/type-gsm/:id", typesGSMController.getOneTypeGSM);
router.put("/type-gsm", typesGSMController.updateTypeGSM);
router.delete("/type-gsm/:id", typesGSMController.deleteTypeGSM);

module.exports = router;
