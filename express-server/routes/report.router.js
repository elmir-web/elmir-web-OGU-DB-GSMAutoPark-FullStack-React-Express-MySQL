const Router = require("express");
const reportController = require("../controllers/report.controller");

const router = new Router();

router.get("/gsm-day-garage", reportController.getGSMDayGarage);
router.get("/gsm-day-garage/get-sheet/:id", reportController.getSheetsToGarage);
router.post("/gsm-day-garage/get-report", reportController.getReport);
router.get("/report-sheet/:id", reportController.sheetReport);

module.exports = router;
