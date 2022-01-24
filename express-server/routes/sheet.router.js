const Router = require("express");
const sheetController = require("../controllers/sheet.controller");

const router = new Router();

router.post("/sheet", sheetController.createSheet);
router.get("/sheet", sheetController.getSheets);
router.get("/sheet/:id", sheetController.getOneSheet);
router.put("/sheet", sheetController.updateSheet);
router.delete("/sheet/:id", sheetController.deleteSheet);

module.exports = router;
