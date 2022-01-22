const Router = require("express");
const vehicleController = require("../controllers/vehicle.controller");

const router = new Router();

router.post("/vehicle", vehicleController.createVehicle);
router.get("/vehicle", vehicleController.getVehicles);
router.get("/vehicle/:id", vehicleController.getOneVehicle);
router.put("/vehicle", vehicleController.updateVehicle);
router.delete("/vehicle/:id", vehicleController.deleteVehicle);

module.exports = router;
