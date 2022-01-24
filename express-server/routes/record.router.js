const Router = require("express");
const recordController = require("../controllers/record.controller");

const router = new Router();

router.post("/record", recordController.createRecord);
router.get("/record", recordController.getRecords);
router.get("/record/:id", recordController.getOneRecord);
router.put("/record", recordController.updateRecord);
router.delete("/record/:id", recordController.deleteRecord);

module.exports = router;
