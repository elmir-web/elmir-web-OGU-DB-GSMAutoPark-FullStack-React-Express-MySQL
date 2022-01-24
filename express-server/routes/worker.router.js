const Router = require("express");
const workerController = require("../controllers/worker.controller");

const router = new Router();

router.post("/worker", workerController.createWorker);
router.get("/worker", workerController.getWorkers);
router.get("/worker/:id", workerController.getOneWoker);
router.put("/worker", workerController.updateWorker);
router.delete("/worker/:id", workerController.deleteWorker);

module.exports = router;
